import packageJson from '../package.json';
import { Gitlab } from '@gitbeaker/rest';
import git from 'simple-git';

async function prepare() {
	const config = await getConfig();

	// Construct the repository URL using config.gitlabUrl and project.path_with_namespace
	const project = await config.api.Projects.show(config.projectId);
	const repoUrl = `${config.gitlabUrl}/${project.path_with_namespace}.git`.replace('https://', `https://gitlab-ci-token:${config.gitlabToken}@`);

	// Initialize simple-git instance
	const simpleGit = git();
	await simpleGit.addConfig('http.sslVerify', 'false');

	// Check if the "gitlab" remote exists
	const remotes = await simpleGit.getRemotes(true);
	if (!remotes.some(remote => remote.name === 'gitlab')) {
		// Only add the "gitlab" remote if it doesn't exist
		await simpleGit.addRemote('gitlab', repoUrl);
	}

	// Forcefully push to the sourceBranch on GitLab, overwriting any changes.
	await simpleGit.push(['-f', 'gitlab', `HEAD:${config.sourceBranch}`]);
	console.log(`Successfully pushed (forcefully) the current branch state as ${config.sourceBranch} to GitLab.`);
}

async function publish(pluginConfig, context) {
	const config = getConfig();
	const targetBranch = process.env.GITLAB_TARGET_BRANCH || pluginConfig.targetBranch;

	if (!targetBranch) {
		throw new Error('Target branch is missing.');
	}

	await createMergeRequest(config.version, context.nextRelease.notes, config.sourceBranch, targetBranch, config.api, config.projectId);
}

/**
 * Returns an object containing configuration options for publishing the project.
 * @returns An object containing the version, GitLab URL, GitLab token, project ID, source branch, and GitLab API instance.
 */
function getConfig() {
	return {
		version: process.env.VERSION || packageJson.version,
		gitlabUrl: process.env.GITLAB_URL || 'https://gitlab.com',
		gitlabToken: process.env.GITLAB_TOKEN,
		projectId: process.env.GITLAB_PROJECT_ID,
		sourceBranch: process.env.GITLAB_SOURCE_BRANCH || 'release/v' + (process.env.VERSION || packageJson.version),
		api: new Gitlab({
			host: process.env.GITLAB_URL || 'https://gitlab.com',
			token: process.env.GITLAB_TOKEN || ''
		})
	};
}

/**
 * Creates a merge request for the given version and notes.
 * @param {string} version - The version to be released.
 * @param {string} notes - The release notes.
 * @param {string} sourceBranch - The source branch for the merge request.
 * @param {string} targetBranch - The target branch for the merge request.
 * @param {object} api - The GitLab API object.
 * @param {number} projectId - The ID of the GitLab project.
 * @returns {Promise<void>} - A Promise that resolves when the merge request is created.
 */
async function createMergeRequest(version: string, notes: string, sourceBranch: string, targetBranch: string, api: object, projectId: number): Promise<void> {
	const mergeRequestTitle = `Release v${version}`;
	const mergeRequestDescription = notes;

	console.log(`Creating merge request with title: ${mergeRequestTitle}`);
	console.debug(`Creating merge request with source branch: ${sourceBranch}`);
	console.debug(`Creating merge request with target branch: ${targetBranch}`);

	const {web_url: webUrl} = await api.MergeRequests.create(projectId, sourceBranch, targetBranch, mergeRequestTitle, {
		removeSourceBranch: true,
		description: mergeRequestDescription,
	});
	console.log(`Merge request created: ${webUrl}`);
}
