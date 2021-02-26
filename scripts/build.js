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

if (!argv.placeholders) {
  const pkg = require(root + '/package.json');
  const version = pkg ? pkg.version : null;

  const VERSION = version || '0.0.0';
  const TIMESTAMP = Date.now();
  const DATE_TIME = new Date().toISOString();
  const GIT_HASH = execSync('git rev-parse HEAD').toString().trim();
  const GIT_HASH_SHORT = execSync('git rev-parse --short HEAD')
    .toString()
    .trim();
  const GIT_TAG = execSync('git describe --always --tag --abbrev=0')
    .toString()
    .trim();
  const GIT_BRANCH = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

  content = content
    .replace('{VERSION}', VERSION)
    .replace('{TIMESTAMP}', TIMESTAMP)
    .replace('{DATE_TIME}', DATE_TIME)
    .replace('{GIT_HASH}', GIT_HASH)
    .replace('{GIT_HASH_SHORT}', GIT_HASH_SHORT)
    .replace('{GIT_TAG}', GIT_TAG)
    .replace('{GIT_BRANCH}', GIT_BRANCH);
}

const file = path.join('./index.js');
fs.writeFileSync(file, content, { encoding: 'utf-8' });
