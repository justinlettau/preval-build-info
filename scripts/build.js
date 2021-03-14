const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = require('app-root-path');
const argv = require('minimist')(process.argv.slice(2));

let content = `// IMPORTANT: THIS FILE IS AUTO GENERATED!

/**
 * Package version.
 */
exports.version = '{VERSION}';

/**
 * Timestamp.
 */
exports.timestamp = '{TIMESTAMP}';

/**
 * ISO date and time.
 */
exports.dateTime = '{DATE_TIME}';

/**
 * Git hash.
 */
exports.gitHash = '{GIT_HASH}';

/**
 * Git short hash.
 */
exports.gitHashShort = '{GIT_HASH_SHORT}';

/**
 * Git tag name.
 */
exports.gitTag = '{GIT_TAG}';

/**
 * Git branch name.
 */
exports.gitBranch = '{GIT_BRANCH}';
`;

if (!argv.placeholders && !process.env.PREVAL_BUILD_INFO_PLACEHOLDERS) {
  const TIMESTAMP = Date.now();
  content = content.replace('{TIMESTAMP}', TIMESTAMP);

  const DATE_TIME = new Date().toISOString();
  content = content.replace('{DATE_TIME}', DATE_TIME);

  try {
    const pkg = require(root + '/package.json');
    const version = pkg ? pkg.version : null;

    const VERSION = version || '0.0.0';
    content = content.replace('{VERSION}', VERSION);
  } catch (error) {
    console.log(error);
  }

  try {
    const GIT_HASH = execSync('git rev-parse HEAD').toString().trim();

    content = content.replace('{GIT_HASH}', GIT_HASH);
  } catch (error) {
    console.log(error);
  }

  try {
    const GIT_HASH_SHORT = execSync('git rev-parse --short HEAD')
      .toString()
      .trim();

    content = content.replace('{GIT_HASH_SHORT}', GIT_HASH_SHORT);
  } catch (error) {
    console.log(error);
  }

  try {
    const GIT_TAG = execSync('git describe --always --tag --abbrev=0')
      .toString()
      .trim();

    content = content.replace('{GIT_TAG}', GIT_TAG);
  } catch (error) {
    console.log(error);
  }

  try {
    const GIT_BRANCH = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();

    content = content.replace('{GIT_BRANCH}', GIT_BRANCH);
  } catch (error) {
    console.log(error);
  }
}

const file = path.join(__dirname, '../index.js');
fs.writeFileSync(file, content, { encoding: 'utf-8' });
