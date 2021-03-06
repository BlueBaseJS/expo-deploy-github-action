const api = require('./github-api');
const githubEvent = require('./github-event');
const {
	GITHUB_REPOSITORY_NAME,
	GITHUB_TOKEN,
	REPO_DIRECTORY,
	VERSION,
} = require('./constants');
const download = require('./download');
const ghReleaseAssets = require('gh-release-assets');

const uploadReleaseAsset = async (assetUrl, platform) => {
	const event = await githubEvent();
	const owner = event.repository.owner.login;
	const repo = event.repository.name;

	const version = VERSION;

	if (!version) {
		throw Error('No version found in package.json');
	}

	console.log(`->> Finding version: ${version} in GitHub releases`);

	const release = await api.repos.getReleaseByTag({
		owner,
		repo,
		tag: `v${version}`,
	});

	console.log(
		`->> GitHub Release found. ID: ${release.data.id}, Upload URL: ${release.data.upload_url}`
	);

	const upload_url = release.data.upload_url;

	if (!upload_url) {
		throw Error(`No release found with tagname: v${version}`);
	}

	const extension = platform === 'android' ? 'apk' : 'ipa';
	const local_url = `${REPO_DIRECTORY}/${GITHUB_REPOSITORY_NAME}.${extension}`;

	console.log(`->> Attempting to download file at: ${local_url}`);

	await download(assetUrl, local_url);

	console.log(
		`->> Download complete, uploading to GitHub release tag: ${`v${version}`} (${
			release.data.id
		})`
	);

	// walkSync(REPO_DIRECTORY);
	await ghReleaseAssetsAsync({
		url: upload_url,
		token: [GITHUB_TOKEN],
		assets: [
			{
				name: platform === 'android' ? 'Android App' : 'iOS App',
				path: local_url,
			},
		],
	});

	console.log('->> GitHub Upload Complete');
};

const ghReleaseAssetsAsync = async opts => {
	return new Promise((resolve, reject) => {
		ghReleaseAssets(opts, function(err, assets) {
			if (err) {
				return reject(err);
			}

			resolve(assets);
		});
	});
};

module.exports = uploadReleaseAsset;
