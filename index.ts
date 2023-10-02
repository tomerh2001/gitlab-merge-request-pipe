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
		pushSourceBranch: process.env.PUSH_SOURCE_BRANCH || true,
		mergeDescription: process.env.GITLAB_MERGE_DESCRIPTION || null,
		sslVerify: process.env.SSL_VERIFY || false,
	};
}

async function getChangelog() {
    try {
        // Fetch all the tags.
        const tags = await simpleGit.tags();
        
        // If there are less than 2 tags, we can't compare.
        if (tags.all.length < 2) {
            console.error('There are less than two tags. Unable to compare.');
            return null;
        }

        // Get the last two tags.
        const lastTag = tags.all[tags.all.length - 1];
        const previousTag = tags.all[tags.all.length - 2];
		console.debug(`Using tags ${previousTag} --> ${lastTag}`)
        
        // Get the diff for the CHANGELOG.md file between the last two tags.
		const changelogDiff = await simpleGit.diff([`${previousTag}..${lastTag}`, '--', 'CHANGELOG.md']);
        const addedLines = changelogDiff.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++'));
        
        // Convert the raw added lines to a clean changelog format:
        return addedLines.map(line => line.substring(1)).join('\n');
    } catch (error) {
        console.error('Failed to get changes from CHANGELOG.md between the last two tags:', error);
        return null;
    }
}

const config = getConfig();
console.debug('Running with config:', config)

const gitlab = new Gitlab({host: config.gitlabUrl, token: config.gitlabToken});
const simpleGit = git({config: [`http.sslVerify=${config.sslVerify}`]});

const project = await gitlab.Projects.show(config.projectId);
const repoUrl = `${config.gitlabUrl}/${project.path_with_namespace}.git`.replace('https://', `https://gitlab-ci-token:${config.gitlabToken}@`);
console.debug('Constructed repo URL:', repoUrl)

const remotes = await simpleGit.getRemotes(true);
if (!remotes.some(remote => remote.name === 'gitlab')) 
{
	await simpleGit.addRemote('gitlab', repoUrl);
	console.debug('Added git remote "gitlab"')
}

if (config.pushSourceBranch)
{
	await simpleGit.push(['-f', 'gitlab', `HEAD:${config.sourceBranch}`]);
	console.log(`Pushed the current state as "${config.sourceBranch}" to `, repoUrl);
}

if (!config.mergeDescription) 
{
	console.debug('No GITLAB_MERGE_DESCRIPTION provided, using CHANGELOG.md')
	config.mergeDescription = await getChangelog()
	console.debug(config.mergeDescription)
}

