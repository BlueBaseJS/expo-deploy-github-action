const { REPO_DIRECTORY } = require('./constants');

const fs = require('fs');
const path = require('path');

const getVersion = () => {
	const contents = fs.readFileSync(path.join(REPO_DIRECTORY, 'package.json'));
	const pkg = JSON.parse(contents);

	return pkg.version;
};

module.exports = getVersion;
