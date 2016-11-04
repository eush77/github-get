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

### `github-get [-l | --long] [--pager] <user> <repo> [<path>]`

Lists directory or cats file contents at `<path>`.

With `--long`, prints full paths instead of relative names.

With `--pager`, shows result in a `$PAGER`. This is not equivalent to `github-get ... | $PAGER`. Instead, the pager gets the file name argument which allows for syntax highlighting (e.g. via `$LESSOPEN` hook).

## API

### `githubGet(["owner/repo[/path]"], [options], callback(err, data, content))`

#### Options

option | description | default value
:----: | ----------- | :-----------:
`owner` | Owner of the repository (user/organization) |
`repo` | Repository name |
`path` | Path to file or directory in the repository | `/` (root)
`decode` | Whether file contents should be decoded. No-op for directories | `true`
`token` | GitHub token for authentication. Unauthenticated requests to GitHub API are [limited][rate-limiting] to 60 requests per hour. Generate your token [here][new-token] |
`endpoint` | API endpoint | https://api.github.com/

#### `data`

Data returned by GitHub API. Object or array of objects, depending on whether path is to a file or a directory.

#### `content`

File contents (array) or directory listing.

[rate-limiting]: https://developer.github.com/v3/#rate-limiting
[new-token]: https://github.com/settings/tokens/new

## Related

- [npm-get] — fetch files and list directories from npm packages.

[npm-get]: https://github.com/eush77/npm-get

## Install

```
npm install -g github-get
```

## License

MIT
