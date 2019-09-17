// const meta = require('github-action-meta');
const slugify = require('slugify');
const getVersion = require('./version');

const EXPO_CLI_USERNAME = process.env['EXPO_CLI_USERNAME'];
const EXPO_CLI_PASSWORD = process.env['EXPO_CLI_PASSWORD'];
const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

const GITHUB_EVENT_NAME = process.env['GITHUB_EVENT_NAME'];
const GITHUB_EVENT_PATH = process.env['GITHUB_EVENT_PATH'];
const GITHUB_SHA = process.env['GITHUB_SHA'];
const GITHUB_REF = process.env['GITHUB_REF'];
const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY'];
const REPO_DIRECTORY = process.env['GITHUB_WORKSPACE'];

const GITHUB_REPOSITORY_OWNER = GITHUB_REPOSITORY.split('/')[0]; // meta.git.owner;
const GITHUB_REPOSITORY_NAME = GITHUB_REPOSITORY.split('/')[1]; // meta.git.name;
const GITHUB_BRANCH = process.env['GITHUB_REF'].substring(11); //meta.git.branch;

const VERSION = getVersion();

if (!REPO_DIRECTORY) {
	console.log('There is no GITHUB_WORKSPACE environment variable');
	process.exit(1);
}

let GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-dev';

switch (GITHUB_BRANCH) {
	case 'alpha':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-alpha';
		break;

	case 'beta':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-beta';
		break;

	case 'next':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-next';
		break;

	case 'master':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'expo-production';
		break;
}

let EXPO_RELEASE_CHANNEL = slugify(GITHUB_BRANCH);

switch (GITHUB_BRANCH) {
	case 'alpha':
		EXPO_RELEASE_CHANNEL = slugify(`alpha-${VERSION}`);
		break;

	case 'beta':
		EXPO_RELEASE_CHANNEL = slugify(`beta-${VERSION}`);
		break;

	case 'next':
		EXPO_RELEASE_CHANNEL = 'next';
		break;

	case 'master':
		EXPO_RELEASE_CHANNEL = 'production';
		break;
}

module.exports = {
	EXPO_CLI_USERNAME,
	EXPO_CLI_PASSWORD,
	EXPO_RELEASE_CHANNEL,
	GITHUB_DEPLOYMENT_ENVIORNMENT,
	GITHUB_TOKEN,
	GITHUB_EVENT_NAME,
	GITHUB_EVENT_PATH,
	GITHUB_SHA,
	GITHUB_REF,
	GITHUB_REPOSITORY,
	GITHUB_REPOSITORY_OWNER,
	GITHUB_REPOSITORY_NAME,
	GITHUB_BRANCH,
	REPO_DIRECTORY,
	VERSION,
};
