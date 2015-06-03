[![npm](https://nodei.co/npm/github-get.png)](https://nodei.co/npm/github-get/)

# github-get

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Fetch files and list directories via GitHub API.

[travis]: https://travis-ci.org/eush77/github-get
[travis-badge]: https://travis-ci.org/eush77/github-get.svg
[david]: https://david-dm.org/eush77/github-get
[david-badge]: https://david-dm.org/eush77/github-get.png

## API

### `githubGet(owner, repo, [path], [options], callback(err, data))`
### `githubGet("owner/repo", [path], [options], callback(err, data))`

#### `path`

Path to file in repository. Defaults to `/` (root).

#### `options.token`

GitHub token for authentication. Unauthenticated requests to GitHub API are [limited][rate-limiting] to only 60 requests per hour.

[Generate your token][new-token].

[rate-limiting]: https://developer.github.com/v3/#rate-limiting
[new-token]: https://github.com/settings/tokens/new

#### `options.endpoint`

Defaults to `https://api.github.com/`.

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
