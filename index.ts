#!/usr/bin/env node

/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import process from 'node:process';
import {join} from 'node:path';
import {Gitlab} from '@gitbeaker/rest';
import git from 'simple-git';
import pino from 'pino';
import PinoPretty from 'pino-pretty';
import {program} from 'commander';

const logger = pino(PinoPretty({ignore: 'pid,hostname'}));

/**
 * Retrieves the configuration options for the GitLab merge request pipeline.
 * @param path - The path to the package.json file.
 * @returns An object containing the configuration options.
 */
async function getConfig(path: string) {
	const packageJson = await Bun.file(join(path, 'package.json')).json();

	return {
		version: process.env.VERSION ?? packageJson.version,
		gitlabUrl: process.env.GITLAB_URL ?? 'https://gitlab.com',
		gitlabToken: process.env.GITLAB_TOKEN,
		projectId: process.env.GITLAB_PROJECT_ID,
		sourceBranch: process.env.GITLAB_SOURCE_BRANCH ?? 'release/v' + (process.env.VERSION ?? packageJson.version),
		targetBranch: process.env.GITLAB_TARGET_BRANCH ?? 'main',
		pushSourceBranch: process.env.PUSH_SOURCE_BRANCH ?? true,
		createMergeRequest: process.env.CREATE_MERGE_REQUEST ?? true,
		mergeDescription: process.env.GITLAB_MERGE_DESCRIPTION ?? null,
		sslVerify: process.env.SSL_VERIFY ?? false,
		changelogOutputPath: process.env.CHANGELOG_OUTPUT_PATH ?? process.env.BITBUCKET_PIPE_SHARED_STORAGE_DIR ?? null,
	};
}

/**
 * Retrieves the changelog diff between the current HEAD and the target branch HEAD.
 * @param path - The path to the Git repository.
 * @returns A Promise that resolves to the changelog diff as a string, or null if an error occurs.
 */
async function getChangelog(path: string) {
	try {
		const config = await getConfig(path);
		const targetBranch = config.targetBranch;
		const simpleGit = git(path).env({GIT_SSL_NO_VERIFY: config.sslVerify.toString()});

		const currentHead = await simpleGit.revparse(['HEAD']);
		const gitlab = new Gitlab({host: config.gitlabUrl, token: config.gitlabToken});
		const targetBranchDetails = await gitlab.Branches.show(config.projectId, targetBranch);

		if (!targetBranchDetails) {
			logger.error(`Unable to fetch details of branch ${targetBranch} from GitLab.`);
			return null;
		}

		const targetBranchHead = targetBranchDetails.commit.id;

		logger.info({previousHead: targetBranchHead, currentHead}, 'Getting CHANGELOG diff between commits');
		const changelogDiff = await simpleGit.diff([`${targetBranchHead}..${currentHead}`, '--', 'CHANGELOG.md']);
		const addedLines = changelogDiff.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++'));

		return addedLines.map(line => line.slice(1)).join('\n');
	} catch (error) {
		logger.error(error, 'Failed to get changes from CHANGELOG.md');
		return null;
	}
}

/**
 * Main function that performs the GitLab merge request pipeline.
 * @param path - The path to the Git repository.
 * @returns A Promise that resolves when the pipeline is complete.
 */
async function main(path: string) {
	logger.info({path});
	const config = await getConfig(path);
	logger.info(config, 'Configuration');

	const gitlab = new Gitlab({host: config.gitlabUrl, token: config.gitlabToken});
	const simpleGit = git(path).env({GIT_SSL_NO_VERIFY: config.sslVerify.toString()});

	const project = await gitlab.Projects.show(config.projectId);

	let repoUrl = `${config.gitlabUrl}/${project.path_with_namespace}.git`;
	logger.info({repoUrl}, 'Constructing repo URL');

	if (config.gitlabToken) {
		repoUrl = repoUrl.replace('https://', `https://gitlab-ci-token:${config.gitlabToken}@`);
		logger.info({repoUrl}, 'Constructed repo URL');
	}

	const remotes = await simpleGit.getRemotes(true);
	if (!remotes.some(remote => remote.name === 'gitlab')) {
		await simpleGit.addRemote('gitlab', repoUrl);
		logger.info('Added git remote "gitlab"');
	}

	if (config.pushSourceBranch) {
		await simpleGit.push(['-f', 'gitlab', `HEAD:${config.sourceBranch}`]);
		logger.info(`Pushed the current state as "${config.sourceBranch}" to ${repoUrl}`);
	}

	if (!config.mergeDescription) {
		logger.warn('No GITLAB_MERGE_DESCRIPTION provided, using CHANGELOG.md');
		config.mergeDescription = await getChangelog(path);
		logger.info(config.mergeDescription);
	}

	if (config.createMergeRequest) {
		try {
			const {web_url: webUrl} = await gitlab.MergeRequests.create(
				config.projectId!,
				config.sourceBranch,
				config.targetBranch,
				`Release v${config.version}`,
				{
					removeSourceBranch: true,
					description: config.mergeDescription,
				},
			);
			logger.info(`Merge request created at ${webUrl}`);
		} catch (error) {
			logger.error(error);
		}
	}

	if (config.changelogOutputPath) {
		const outputPath = join(config.changelogOutputPath, 'CHANGELOG_DIFF.md');
		await Bun.write(outputPath, config.mergeDescription!);
		logger.info(`Wrote CHANGELOG.md to ${outputPath}`);
	}
}

program.argument('<path>', 'Path of the repository to release').action(main);
program.parse(process.argv);
