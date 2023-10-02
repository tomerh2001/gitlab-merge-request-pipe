import {Gitlab} from '@gitbeaker/rest';
import git from 'simple-git';
import packageJson from '../package.json';

function getConfig() {
	return {
		version: process.env.VERSION || packageJson.version,
		gitlabUrl: process.env.GITLAB_URL || 'https://gitlab.com',
		gitlabToken: process.env.GITLAB_TOKEN,
		projectId: process.env.GITLAB_PROJECT_ID,
		sourceBranch: process.env.GITLAB_SOURCE_BRANCH || 'release/v' + (process.env.VERSION || packageJson.version),
		pushSourceBranch: process.env.PUSH_SOURCE_BRANCH || true
	};
}

const config = getConfig();
console.debug('Running with config:', config)

const gitlab = new Gitlab({host: config.gitlabUrl, token: config.gitlabToken});
const simpleGit = git({config: ['http.sslVerify=false']});

const project = await gitlab.Projects.show(config.projectId);
const repoUrl = `${config.gitlabUrl}/${project.path_with_namespace}.git`.replace('https://', `https://gitlab-ci-token:${config.gitlabToken}@`);
console.debug('Constructed repo URL:', repoUrl)

const remotes = await simpleGit.getRemotes(true);
if (!remotes.some(remote => remote.name === 'gitlab')) {
	await simpleGit.addRemote('gitlab', repoUrl);
	console.debug('Added git remote "gitlab"')
}

if (config.pushSourceBranch)
{
	await simpleGit.push(['-f', 'gitlab', `HEAD:${config.sourceBranch}`]);
	console.log(`Pushed the current state as "${config.sourceBranch}" to `, repoUrl);
}
