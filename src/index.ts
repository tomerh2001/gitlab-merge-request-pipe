#!/usr/bin/env node

/* eslint-disable n/prefer-global/process */

/* eslint-disable import/extensions */

import {program} from 'commander';
import main from './main';

/**
 * Defines the command-line interface for creating a GitLab merge request for a release using the CHANGELOG.md.
 *
 * @param program - The commander program instance.
 */
export const command = program
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
	.option('--fetchAll [boolean]', 'Fetch all remotes', process.env.FETCH_ALL ?? true)
	.option('--mergeTargetIntoSource [boolean]', 'Merge target branch into source branch', process.env.MERGE_TARGET_INTO_SOURCE ?? true)
	.option('--deleteSameTargetMergeRequest [boolean]', 'Delete existing merge requests with the same target branch', process.env.GITLAB_DELETE_SAME_TARGET_MERGE_REQUEST ?? false)
	.option('--autoMerge [boolean]', 'Enable auto-merge for the merge request', process.env.GITLAB_AUTO_MERGE ?? false)
	.option('-i, --ignore <path>', 'Add a path to ignore',
		(path, previous = []) => [...previous, path],
		process.env.GITLAB_IGNORE_PATHS?.split(';').map(x => x?.trim()) ?? [],
	)
	.action(main);

program.parse(process.argv);

/**
 * Command line options for the GitLab merge request pipeline.
 */
export const options = program.opts();

