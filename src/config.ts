/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {join} from 'node:path';
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
