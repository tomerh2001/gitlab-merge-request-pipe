
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {logger} from './logger.js';
import {getChangelog, writeChangelog} from './changelog.js';
import {getConfig, getGitManagers} from './config.js';
import {
	pushSourceBranch, addGitlabRemote, fetchAll, createMergeRequest,
	deleteSameTargetMergeRequest,
} from './git.js';
import constructRepoUrl from './helpers/construct-repo-url.js';

/**
 * Main function that performs the GitLab merge request pipeline.
 * @param path - The path to the Git repository.
 * @returns A Promise that resolves when the pipeline is complete.
 */

export default async function main(path: string) {
	logger.info({path});

	const config: any = await getConfig(path);
	logger.info(config, 'Configuration');

	const {gitlab, simpleGit} = getGitManagers(config, path);
	const project = await gitlab.Projects.show(config.projectId);

	let repoUrl = `${config.gitlabUrl}/${project.path_with_namespace}.git`;
	logger.info({repoUrl}, 'Constructing repo URL');

	if (config.gitlabToken) {
		repoUrl = constructRepoUrl(repoUrl, config);
	}

	const remotes = await simpleGit.getRemotes(true);
	if (!remotes.some(remote => remote.name === 'gitlab')) {
		await addGitlabRemote(simpleGit, repoUrl);
	}

	if (config.fetchAll) {
		await fetchAll(simpleGit);
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

	if (config.deleteSameTargetMergeRequest) {
		await deleteSameTargetMergeRequest(gitlab, config);
	}

	if (config.createMergeRequest) {
		await createMergeRequest(simpleGit, gitlab, config);
	}

	if (config.changelogOutputPath) {
		await writeChangelog(config);
	}
}
