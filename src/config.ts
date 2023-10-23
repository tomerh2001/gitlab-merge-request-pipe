/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {join} from 'node:path';
import {Gitlab} from '@gitbeaker/rest';
import git from 'simple-git';
import {options} from '.';

/**
 * Retrieves the configuration options for the GitLab merge request pipeline.
 * @param path - The path to the package.json file.
 * @returns An object containing the configuration options.
 */

export async function getConfig(path: string) {
	const packageJson = await Bun.file(join(path, 'package.json')).json();

	return {
		...options,
		version: options.version ?? packageJson.version,
		sourceBranch: options.sourceBranch ?? 'release/v' + (options.version ?? packageJson.version),
	};
}

/**
 * Returns an object containing Gitlab and simple-git instances.
 * @param config - The configuration object containing gitlabUrl, gitlabToken, and sslVerify properties.
 * @param path - The path to the local git repository.
 * @returns An object containing Gitlab and simple-git instances.
 */
export function getGitManagers(config: any, path: string) {
	const gitlab = new Gitlab({host: config.gitlabUrl, token: config.gitlabToken});
	const simpleGit = git(path).env({GIT_SSL_NO_VERIFY: config.sslVerify.toString() === 'false'});
	return {gitlab, simpleGit};
}
