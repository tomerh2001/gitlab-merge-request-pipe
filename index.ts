#!/usr/bin/env node
/* eslint-disable unicorn/no-await-expression-member */

/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import process from 'node:process';
import {join} from 'node:path';
import {Gitlab} from '@gitbeaker/rest';
import git from 'simple-git';
import {program} from 'commander';
import {pushSourceBranch} from './git';
import {logger} from './logger';

/**
 * Retrieves the changelog diff between the current HEAD and the target branch.
 * @param path - The path to the local repository.
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
		if (!(await simpleGit.branch()).all.includes(targetBranch)) {
			logger.error(`Branch ${targetBranch} does not exist in the local repository, unable to get diff. Returning the full changelog.`);
			return await Bun.file(join(path, 'CHANGELOG.md')).text();
		}

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
	const simpleGit = git(path).env({
		GIT_SSL_NO_VERIFY: config.sslVerify.toString(),
	});

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
		await pushSourceBranch(simpleGit, config);
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
				config.projectId,
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
		await Bun.write(outputPath, config.mergeDescription);
		logger.info(`Wrote CHANGELOG.md to ${outputPath}`);
	}
}

/**
 * Retrieves the configuration options for the GitLab merge request pipeline.
 * @param path - The path to the package.json file.
 * @returns An object containing the configuration options.
 */
async function getConfig(path: string) {
	const packageJson = await Bun.file(join(path, 'package.json')).json();

	return {
		...options,
		version: options.version ?? packageJson.version,
		sourceBranch: options.sourceBranch ?? 'release/v' + (options.version ?? packageJson.version),
	};
}

program
	.description('Create a GitLab merge request for a release using the CHANGELOG.md.')
	.argument('<path>', 'Path of the repository to release')
	.option('-t, --gitlabToken <token>', 'GitLab private token', process.env.GITLAB_TOKEN)
	.option('-p, --projectId <projectId>', 'GitLab project ID', process.env.GITLAB_PROJECT_ID)
	.option('-u, --gitlabUrl <url>', 'GitLab instance URL', process.env.GITLAB_URL ?? 'https://gitlab.com')
	.option('-v, --version <version>', 'Release version')
	.option('-s, --sourceBranch <branch>', 'Source branch for merge request')
	.option('--targetBranch <branch>', 'Target branch for merge request', process.env.GITLAB_TARGET_BRANCH ?? 'main')
	.option('--pushSourceBranch [boolean]', 'Push source branch or not', process.env.PUSH_SOURCE_BRANCH ?? true)
	.option('--createMergeRequest [boolean]', 'Create a merge request or not', process.env.CREATE_MERGE_REQUEST ?? true)
	.option('--mergeDescription <description>', 'Merge request description', process.env.GITLAB_MERGE_DESCRIPTION ?? undefined)
	.option('--sslVerify [boolean]', 'SSL verification', process.env.SSL_VERIFY ?? false)
	.option('--changelogOutputPath <path>', 'Path to output the CHANGELOG diff file', process.env.CHANGELOG_OUTPUT_PATH ?? process.env.BITBUCKET_PIPE_SHARED_STORAGE_DIR ?? undefined)
	.option('-i, --ignore <path>', 'Add a path to ignore',
		(path, previous = []) => [...previous, path],
		process.env.GITLAB_IGNORE_PATHS?.split(';').map(x => x?.trim()) ?? [],
	)
	.action(main);

program.parse(process.argv);

/**
 * Command line options for the GitLab merge request pipeline.
 */
const options = program.opts();
