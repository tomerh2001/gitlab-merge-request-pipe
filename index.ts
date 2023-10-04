
import process from 'node:process';
import {Gitlab} from '@gitbeaker/rest';
import git from 'simple-git';
import pino from 'pino';
import PinoPretty from 'pino-pretty';
import packageJson from './package.json';

// eslint-disable-next-line new-cap
const logger = pino(PinoPretty({ignore: 'pid,hostname'}));

export function getConfig() {
	return {
		version: process.env.VERSION ?? packageJson.version,
		gitlabUrl: process.env.GITLAB_URL ?? 'https://gitlab.com',
		gitlabToken: process.env.GITLAB_TOKEN,
		projectId: process.env.GITLAB_PROJECT_ID,
		sourceBranch: process.env.GITLAB_SOURCE_BRANCH ?? 'release/v' + (process.env.VERSION ?? packageJson.version),
		targetBranch: process.env.GITLAB_TARGET_BRANCH ?? 'main',
		pushSourceBranch: process.env.PUSH_SOURCE_BRANCH ?? true,
		createMergeRequest: process.env.CREATE_MERGE_REQUEST ?? true,
		mergeDescription: process.env.GITLAB_MERGE_DESCRIPTION ?? null,
		sslVerify: process.env.SSL_VERIFY ?? false,
		pushTags: process.env.PUSH_TAGS ?? true,
		addChangelogNoteToTag: process.env.ADD_CHANGELOG_NOTE_TO_TAG ?? true,
	};
}

export async function getChangelog() {
	try {
		const config = getConfig();
		const targetBranch = config.targetBranch;

		const currentHead = await simpleGit.revparse(['HEAD']);
		const targetBranchDetails = await gitlab.Branches.show(config.projectId!, targetBranch);

		if (!targetBranchDetails) {
			logger.error(`Unable to fetch details of branch ${targetBranch} from GitLab.`);
			return null;
		}

		const targetBranchHead = targetBranchDetails.commit.id;

		logger.info({previousHead: targetBranchHead, currentHead}, 'Getting CHANGELOG diff between commits');
		const changelogDiff = await simpleGit.diff([`${targetBranchHead}..${currentHead}`, '--', 'CHANGELOG.md']);
		const addedLines = changelogDiff.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++'));

		return addedLines.map(line => line.slice(1)).join('\n');
	} catch (error) {
		logger.error(error, 'Failed to get changes from CHANGELOG.md');
		return null;
	}
}

const config = getConfig();
logger.info(config, 'Started');

const gitlab = new Gitlab({host: config.gitlabUrl, token: config.gitlabToken!});
const simpleGit = git({config: [`http.sslVerify=${config.sslVerify}`]});

const project = await gitlab.Projects.show(config.projectId!);
const repoUrl = `${config.gitlabUrl}/${project.path_with_namespace}.git`.replace('https://', `https://gitlab-ci-token:${config.gitlabToken}@`);
logger.info({repoUrl}, 'Constructed repo URL:');

const remotes = await simpleGit.getRemotes(true);
if (!remotes.some(remote => remote.name === 'gitlab')) {
	await simpleGit.addRemote('gitlab', repoUrl);
	logger.info('Added git remote "gitlab"');
}

if (config.pushSourceBranch) {
	await simpleGit.push(['-f', 'gitlab', `HEAD:${config.sourceBranch}`]);
	logger.info(`Pushed the current state as "${config.sourceBranch}" to ${repoUrl}`);
}

if (!config.mergeDescription) {
	logger.warn('No GITLAB_MERGE_DESCRIPTION provided, using CHANGELOG.md');
	config.mergeDescription = await getChangelog();
	logger.info(config.mergeDescription);
}

if (config.createMergeRequest) {
	try {
		const {web_url: webUrl} = await gitlab.MergeRequests.create(
			config.projectId!,
			config.sourceBranch,
			config.targetBranch,
			`Release v${config.version}`,
			{
				removeSourceBranch: true,
				description: config.mergeDescription!,
			},
		);
		logger.info(`Merge request created at ${webUrl}`);
	} catch (error) {
		logger.error(error);
	}
}

if (config.addChangelogNoteToTag) {
	// eslint-disable-next-line unicorn/no-await-expression-member
	const latestTag = (await simpleGit.tags()).latest;
	const commitHash = await simpleGit.raw(['rev-list', '-n', '1', latestTag!]);

	await simpleGit.raw(['notes', 'add', '-f', '-m', config.mergeDescription!, commitHash.trim()]);
	await simpleGit.push('origin', 'refs/notes/*');

	logger.info(`Note added to ${latestTag} and pushed to remote`);
}

if (config.pushTags) {
	try {
		await simpleGit.pushTags('gitlab');
		logger.info('Pushed tags to GitLab');
	} catch (error) {
		logger.error(error);
	}
}
