const info = require('.');

describe('build info', () => {
  it('version is default value', () => {
    expect(info.version).toBe('{VERSION}');
  });

  it('timestamp is default value', () => {
    expect(info.timestamp).toBe('{TIMESTAMP}');
  });

  it('gitHash is default value', () => {
    expect(info.gitHash).toBe('{GIT_HASH}');
  });

  it('gitHashShort is default value', () => {
    expect(info.gitHashShort).toBe('{GIT_HASH_SHORT}');
  });

  it('gitTag is default value', () => {
    expect(info.gitTag).toBe('{GIT_TAG}');
  });

  it('gitBranch is default value', () => {
    expect(info.gitBranch).toBe('{GIT_BRANCH}');
  });
});
