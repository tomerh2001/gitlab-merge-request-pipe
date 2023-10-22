
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */

import {type SimpleGit} from 'simple-git';
import {logger} from './logger';

/**
 * Backs up the .gitattributes file by renaming it to .gitattributes_backup.
 * @param git - The SimpleGit instance to use for executing Git commands.
 * @returns A Promise that resolves to a boolean indicating whether the backup was successful.
 */
export async function backupGitAttributes(git: SimpleGit): Promise<boolean> {
	try {
		await git.raw(['ls-files', '.gitattributes']);
		await git.mv('.gitattributes', '.gitattributes_backup');
		return true;
	} catch {
		return false;
	}
}

/**
 * Restores the .gitattributes file from a backup.
 * @param git - The SimpleGit instance to use for the restore operation.
 * @returns A Promise that resolves when the restore operation is complete.
 */
export async function restoreGitAttributes(git: SimpleGit): Promise<void> {
	try {
		await git.mv('.gitattributes_backup', '.gitattributes');
	} catch (restoreError) {
		logger.error(`Failed to restore .gitattributes: ${restoreError.message}`);
	}
}

/**
 * Retrieves the original Git configuration for the user's name and email.
 * @param git - The SimpleGit instance to use for retrieving the configuration.
 * @returns An object containing the user's name and email (if available).
 */
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

/**
 * Checks out the specified file path from the target branch to preserve its state. If the checkout fails, the file is removed from the target branch.
 * @param git - The SimpleGit instance to use for the operation.
 * @param ignorePath - The path of the file to ignore.
 * @param targetBranch - The name of the target branch.
 */
export async function handleIgnorePath(git: SimpleGit, ignorePath: string, config: any): Promise<void> {
	try {
		await git.checkout([`gitlab/${config.targetBranch}`, '--', ignorePath]);
		logger.info(`Checked out ${ignorePath} from "${config.targetBranch}" to preserve its state.`);
	} catch (error) {
		logger.warn(`Failed to checkout ${`gitlab/${ignorePath}`} from "${config.targetBranch}". Error: ${error.message}`);
		await removeFile(git, ignorePath, config.targetBranch);
	}
}

/**
 * Removes a file from the Git repository and commits the change.
 * @param git - The SimpleGit instance.
 * @param ignorePath - The path of the file to remove.
 * @param targetBranch - The name of the target branch.
 */
export async function removeFile(git: SimpleGit, ignorePath: string, targetBranch: string) {
	try {
		await git.raw(['rm', '-r', '-f', ignorePath]);
		await git.commit(`Remove ${ignorePath}`, [ignorePath]);
		logger.info(`Removed ${ignorePath} from the source branch as it doesn't exist in "${targetBranch}".`);
	} catch (rmError) {
		logger.warn(`Failed to remove ${ignorePath} from the source branch. Error: ${rmError.message}`);
	}
}

/**
 * Pushes the current state of the source branch to GitLab after overlaying ignored paths.
 * @param git - The SimpleGit instance to use for Git operations.
 * @param config - The configuration object containing the source branch, target branch, and ignored paths.
 * @returns A Promise that resolves when the push operation is complete.
 * @throws If an error occurs during the push operation.
 */
export async function pushSourceBranch(git: SimpleGit, config: any) {
	const originalConfig = await getOriginalGitConfig(git);
	try {
		const gitattributesBackedUp = await backupGitAttributes(git);

		if (!originalConfig.name) {
			await git.addConfig('user.name', 'Automated Process');
		}

		if (!originalConfig.email) {
			await git.addConfig('user.email', 'auto@process.com');
		}

		logger.info(`Switching to "${config.sourceBranch}" for operations...`);
		await git.checkoutLocalBranch(config.sourceBranch);

		logger.info(`Ensuring ignored paths remain unchanged from "${config.targetBranch}" in source branch...`);
		for (const ignorePath of config.ignore) {
			await handleIgnorePath(git, ignorePath, config);
		}

		logger.info(`Pushing the current state as "${config.sourceBranch}" to GitLab after overlaying ignored paths.`);
		await git.push(['-f', 'gitlab', `HEAD:${config.sourceBranch}`]);

		if (gitattributesBackedUp) {
			await restoreGitAttributes(git);
		}
	} catch (error) {
		logger.error(`Error encountered: ${error.message}`);
		if (await backupGitAttributes(git)) {
			await restoreGitAttributes(git);
		}
	} finally {
		// Try restoring original git configs if they were unset
		if (!originalConfig.name) {
			try {
				await git.raw(['config', '--unset', 'user.name']);
			} catch { /* swallow error */ }
		}

		if (!originalConfig.email) {
			try {
				await git.raw(['config', '--unset', 'user.email']);
			} catch { /* swallow error */ }
		}
	}
}
