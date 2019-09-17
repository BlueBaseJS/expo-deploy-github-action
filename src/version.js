const { REPO_DIRECTORY } = require('./constants');
console.log('Version file');

console.log('REPO_DIRECTORY', REPO_DIRECTORY);
console.log('CURRENT PATH', process.cwd());

const fs = require('fs');
const path = require('path');

const getVersion = () => {
	const contents = fs.readFileSync(path.join(REPO_DIRECTORY || './', 'package.json'));
	const pkg = JSON.parse(contents);

	return pkg.version;
};

module.exports = getVersion;
