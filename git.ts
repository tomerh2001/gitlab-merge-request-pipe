/* eslint-disable import/extensions */

import {type SimpleGit} from 'simple-git';
import {logger} from './logger';

export async function backupGitAttributes(git: SimpleGit): Promise<boolean> {
	try {
		await git.raw(['ls-files', '.gitattributes']);
		await git.mv('.gitattributes', '.gitattributes_backup');
		return true;
	} catch {
		return false;
	}
}

export async function restoreGitAttributes(git: SimpleGit): Promise<void> {
	try {
		await git.mv('.gitattributes_backup', '.gitattributes');
	} catch (restoreError) {
		logger.error(`Failed to restore .gitattributes: ${restoreError.message}`);
	}
}

export async function getOriginalGitConfig(git: SimpleGit): Promise<{name?: string; email?: string}> {
	const config = {};
	try {
		config.name = await git.raw(['config', 'user.name']);
	} catch { /* swallow error */ }

	try {
		config.email = await git.raw(['config', 'user.email']);
	} catch { /* swallow error */ }

	return config;
}

export async function handleIgnorePath(git: SimpleGit, ignorePath: string, targetBranch: string): Promise<void> {
	try {
		await git.checkout([targetBranch, '--', ignorePath]);
		logger.info(`Checked out ${ignorePath} from "${targetBranch}" to preserve its state.`);
	} catch {
		await removeFile(git, ignorePath, targetBranch);
	}
}

async function removeFile(git: SimpleGit, ignorePath: string, targetBranch: string) {
	try {
		await git.raw(['rm', '-f', ignorePath]);
		await git.commit(`Remove ${ignorePath}`, [ignorePath]);
		logger.info(`Removed ${ignorePath} from the source branch as it doesn't exist in "${targetBranch}".`);
	} catch (rmError) {
		logger.warn(`Failed to remove ${ignorePath} from the source branch. Error: ${rmError.message}`);
	}
}

