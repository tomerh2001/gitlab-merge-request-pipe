/* eslint-disable import/extensions */

import {logger} from '../logger';

/**
 * Constructs the repository URL with the GitLab CI token.
 * @param repoUrl - The repository URL.
 * @param config - The configuration object containing the GitLab CI token.
 * @returns The constructed repository URL.
 */
export default function constructRepoUrl(repoUrl: string, config: any) {
	repoUrl = repoUrl.replace('https://', `https://gitlab-ci-token:${config.gitlabToken}@`);
	logger.info({repoUrl}, 'Constructed repo URL');
	return repoUrl;
}
