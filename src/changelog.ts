
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {join} from 'node:path';
import {logger} from './logger';
import {getConfig, getGitManagers} from './config';

/**
 * Retrieves the changes made to the CHANGELOG.md file between the target branch and the current HEAD.
 * If the file is not found in the target branch, returns the local CHANGELOG.md file.
 * @param path - The path to the local repository.
 * @returns A string containing the added lines to the CHANGELOG.md file, or null if an error occurred.
 */
export async function getChangelog(path: string) {
	try {
		const config: any = await getConfig(path);
		const {gitlab, simpleGit} = getGitManagers(config, path);

		const localChangelog = await Bun.file(join(path, 'CHANGELOG.md')).text();
		if (!localChangelog) {
			throw new Error('CHANGELOG.md not found in local repository');
		}

		let gitlabChangelog: any = '';
		try {
			gitlabChangelog = await gitlab.RepositoryFiles.showRaw(config.projectId, 'CHANGELOG.md', config.targetBranch);
		} catch {
			return localChangelog;
		}

		const currentHead = await simpleGit.revparse(['HEAD']);
		const changelogDiff = await simpleGit.diff([`${config.targetBranch}..${currentHead}`, '--', 'CHANGELOG.md']);
		const addedLines = changelogDiff.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++'));

		return addedLines.map(line => line.slice(1)).join('\n');
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
