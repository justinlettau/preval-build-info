[![NPM Version](https://badge.fury.io/js/preval-build-info.svg)](https://badge.fury.io/js/preval-build-info)
[![CI](https://github.com/justinlettau/preval-build-info/workflows/CI/badge.svg)](https://github.com/justinlettau/preval-build-info/actions)
[![codecov](https://codecov.io/gh/justinlettau/preval-build-info/branch/master/graph/badge.svg)](https://codecov.io/gh/justinlettau/preval-build-info)
[![Dependency Status](https://david-dm.org/justinlettau/preval-build-info.svg)](https://david-dm.org/justinlettau/preval-build-info)
[![Dev Dependency Status](https://david-dm.org/justinlettau/preval-build-info/dev-status.svg)](https://david-dm.org/justinlettau/preval-build-info?type=dev)

# Preval Build Info

Pre-evaluate git info, version number, timestamp, etc at build time.

Useful if you need build information in your application but you use a predefined build system (and
don't want to eject) like Angular CLI, for example. Other common solutions require adding a file
to _your_ repository and committing it. That's not ideal because these values change so frequently
(every commit). `preval-build-info` works by reading information from _your_ repository, but storing
the build information within the node_modules folder.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

# Features

- 🚀 Import **Git** information of **your** repo.
- 🕑 Includes **version** number and build **timestamp**.
- 📂 No need to include extra files in your repo.
- 🎉 **TypeScript** types included.

# Installation

```bash
npm install preval-build-info --save
```

# Usage

When you import `preval-build-info`, it contains the information for _your_ repository. The `version`
is pulled from _your_ project's package.json and all the Git information is from _your_ repo.

```js
import * as info from 'preval-build-info';

console.log(info.version);
// => '1.0.0'

console.log(info.timestamp);
// => '1614300015989'

console.log(info.dateTime);
// => '2021-02-26T00:40:15.989Z'

console.log(info.gitHash);
// => 'c8b316d820b7c9cb3b99e8739c2212d34c892815'

console.log(info.gitHashShort);
// => 'c8b316d'

console.log(info.gitTag);
// => 'v1.0.0'

console.log(info.gitBranch);
// => 'master'
```

Build information is generated on `postinstall`. If you also need to update build info manually, you
can use `preval-build-info-cli` in your project's scripts. For example:

```json
"scripts": {
  "prebuild": "preval-build-info-cli",
}
```

# Development

```
npm install
npm run build
```
