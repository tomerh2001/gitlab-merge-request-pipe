
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

/* eslint-disable unicorn/no-await-expression-member */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {join} from 'node:path';
import {logger} from './logger';
import {getConfig, getGitManagers} from './config';

/**
 * Retrieves the changelog diff between the current HEAD and the target branch.
 * @param path - The path to the local repository.
 * @returns A Promise that resolves to the changelog diff as a string, or null if an error occurs.
 */
export async function getChangelog(path: string) {
	try {
		const config: any = await getConfig(path);
		const {gitlab, simpleGit} = getGitManagers(config, path);

		const currentHead = await simpleGit.revparse(['HEAD']);
		const targetBranchDetails = await gitlab.Branches.show(config.projectId, config.targetBranch);

		if (!targetBranchDetails) {
			logger.error(`Unable to fetch details of branch ${config.targetBranch} from GitLab.`);
			return null;
		}

		const targetBranchHead = targetBranchDetails.commit.id;
		if (!(await simpleGit.branch()).all.includes(config.targetBranch)) {
			logger.error(`Branch ${config.targetBranch} does not exist in the local repository, unable to get diff. Returning the full changelog.`);
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

export async function writeChangelog(config: any) {
	const outputPath = join(config.changelogOutputPath, 'CHANGELOG_DIFF.md');
	await Bun.write(outputPath, config.mergeDescription);
	logger.info(`Wrote CHANGELOG.md to ${outputPath}`);
}
