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

```js
var githubGet = require('github-get');

githubGet('octocat/git-consortium', function (err, data) {
  data
  //=> [{ name: 'LICENSE', type: 'file', size: 1077, ... },
  //    { name: 'README.md', type: 'file', size: 306, ... },
  //    { name: 'product-backlog.md', type: 'file', size: 13031, ... }]
});

githubGet('octocat/git-consortium', 'LICENSE', function (err, data) {
  data
  //=> { name: 'LICENSE', size: 1077, content: 'VGhlIE1JVCBMaWNlbnNl...', ... }
});

githubGet('octocat/git-consortium', 'LICENSE', { decode: true }, function (err, data) {
  data
  //=> { name: 'LICENSE', size: 1077, content: 'The MIT License (MIT)\n\n...', ... }
});
```

## API

### `githubGet(owner, repo, [path], [options], callback(err, data))`
### `githubGet("owner/repo", [path], [options], callback(err, data))`

#### `path`

Path to file in repository. Defaults to `/` (root).

#### `options.decode`

Boolean. If enabled, file contents will be decoded. No-op for directories. Defaults to `false`.

#### `options.token`

GitHub token for authentication. Unauthenticated requests to GitHub API are [limited][rate-limiting] to only 60 requests per hour. Generate your token [here][new-token].

[rate-limiting]: https://developer.github.com/v3/#rate-limiting
[new-token]: https://github.com/settings/tokens/new

#### `options.endpoint`

API endpoint to talk to. Defaults to `https://api.github.com/`.

## CLI

### `github-get [-l | --long] <user> <repo> [<path>]`

Lists directory or cats file contents at `<path>`.

With `--long`, prints full paths instead of relative names.

## Install

```
npm install github-get
```

## License

MIT
