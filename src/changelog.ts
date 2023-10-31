/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {join} from 'node:path';
import {logger} from './logger';
import {getConfig, getGitManagers} from './config';

/**
 * Retrieves the changes from the local CHANGELOG.md file that are not in the GitLab changelog.
 * If there's no changelog on GitLab, returns the local one.
 * @param path - The path to the local repository.
 * @returns A string containing the new changes in the local CHANGELOG.md file that are not in the GitLab changelog.
 */
export async function getChangelog(path: string) {
	try {
		const config: any = await getConfig(path);
		const {gitlab} = getGitManagers(config, path);

		const localChangelog = await Bun.file(join(path, 'CHANGELOG.md')).text();
		if (!localChangelog) {
			throw new Error('CHANGELOG.md not found in local repository');
		}

		let gitlabChangelog: any = '';
		try {
			gitlabChangelog = await gitlab.RepositoryFiles.showRaw(config.projectId, 'CHANGELOG.md', config.targetBranch);
		} catch {
			// If there's no changelog on GitLab, return the local one
			return localChangelog;
		}

		const localChangelogLines = localChangelog.split('\n');
		const gitlabChangelogLines = gitlabChangelog.split('\n');

		// Get the new changes in the local CHANGELOG.md file that are not in the GitLab changelog
		return localChangelogLines.filter((line: string) => !gitlabChangelogLines.includes(line)).join('\n');
	} catch (error) {
		logger.error(error, 'Failed to get changes from CHANGELOG.md');
		return '';
	}
}

export async function writeChangelog(config: any) {
	const outputPath = join(config.changelogOutputPath, 'CHANGELOG_DIFF.md');
	await Bun.write(outputPath, config.mergeDescription);
	logger.info(`Wrote CHANGELOG.md to ${outputPath}`);
}
