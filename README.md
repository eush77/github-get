[![npm](https://nodei.co/npm/github-get.png)](https://nodei.co/npm/github-get/)

# github-get

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Fetches files and lists directories from GitHub repositories. Decodes base64.

[Relevant GitHub API section.][api-section]

[api-section]: https://developer.github.com/v3/repos/contents/#get-contents

[travis]: https://travis-ci.org/eush77/github-get
[travis-badge]: https://travis-ci.org/eush77/github-get.svg
[david]: https://david-dm.org/eush77/github-get
[david-badge]: https://david-dm.org/eush77/github-get.png

## Example

```
$ github-get eush77 github-get
test/
.gitignore
.travis.yml
LICENSE
README.md
cli.js
index.js
package.json
```

```
$ github-get eush77 github-get test/test.js
'use strict';

var test = require('tape'),
    rewire = require('rewire');
# ...
```

## CLI

### `github-get [-l | --long] <user> <repo> [<path>]`

Lists directory or cats file contents at `<path>`.

With `--long`, prints full paths instead of relative names.

## API

### `githubGet(owner, repo, [path], [options], callback(err, data, content))`
### `githubGet("owner/repo", [path], [options], callback(err, data, content))`

#### `path`

Path to file in repository. Defaults to `/` (root).

#### `data`

Data returned by GitHub API. Object or array of objects, depending on whether file is a directory.

#### `content`

File contents (array) or directory listing.

#### `options.decode`

Boolean. If enabled, file contents will be decoded. No-op for directories. Defaults to `true`.

#### `options.token`

GitHub token for authentication. Unauthenticated requests to GitHub API are [limited][rate-limiting] to only 60 requests per hour. Generate your token [here][new-token].

[rate-limiting]: https://developer.github.com/v3/#rate-limiting
[new-token]: https://github.com/settings/tokens/new

#### `options.endpoint`

API endpoint to talk to. Defaults to `https://api.github.com/`.

## Related

- [npm-get] — fetch files and list directories from npm packages.

[npm-get]: https://github.com/eush77/npm-get

## Install

```
npm install -g github-get
```

## License

MIT
