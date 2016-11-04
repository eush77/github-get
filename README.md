[![npm](https://nodei.co/npm/github-get.png)](https://nodei.co/npm/github-get/)

# github-get

[![Build Status][travis-badge]][travis]
[![Dependency Status][david-badge]][david]
[![CLI Module][cli-badge]][github-get-cli]

Fetch files or list directories from GitHub repositories.

[Relevant GitHub API section.][api-section]

[api-section]: https://developer.github.com/v3/repos/contents/#get-contents

[travis]: https://travis-ci.org/eush77/github-get
[travis-badge]: https://travis-ci.org/eush77/github-get.svg
[david]: https://david-dm.org/eush77/github-get
[david-badge]: https://david-dm.org/eush77/github-get.png
[cli-badge]: https://img.shields.io/badge/cli-github--get--cli-blue.svg "CLI Module"

## Example

If given a directory path, returns directory listing:

```js
githubGet('eush77/github-get', function (err, files) {
    if (err) throw err;
    console.log(files);
})

//=> [ '.gitignore',
//     '.travis.yml',
//     'LICENSE',
//     'README.md',
//     'cli.js',
//     'index.js',
//     'package.json',
//     'test' ]
```

If given a file path, returns file contents:

```js
githubGet('eush77/github-get/package.json', function (err, pkg) {
    if (err) throw err;
    console.log(JSON.parse(pkg).description);
})

//=> 'Fetch files and list directories from GitHub repositories'
```

All data returned from GitHub API is also available:

```js
githubGet('eush77/github-get/package.json', function (err, pkg, data) {
    if (err) throw err;
    console.log(data.download_url);
})

//=> 'https://raw.githubusercontent.com/eush77/github-get/master/package.json'
```

## API

### `githubGet(["owner/repository[/path]"], [options], callback(err, content, data))`

#### Options

option | description | default value
:----: | ----------- | :-----------:
`owner` | Owner of the repository (user/organization) |
`repository` | Repository name |
`path` | Path to file or directory in the repository | `/` (root)
`decode` | Whether file contents should be decoded. No-op for directories | `true`
`token` | GitHub token for authentication. Unauthenticated requests to GitHub API are [limited][rate-limiting] to 60 requests per hour. Generate your token [here][new-token] |
`endpoint` | API endpoint | https://api.github.com/

`owner`, `repository`, and `path` can either be specified in a path string (first argument) or in the `options`.

#### `content`

File contents (array) or directory listing.

#### `data`

Data returned by GitHub API. Object or array of objects, depending on whether path is to a file or a directory.

[rate-limiting]: https://developer.github.com/v3/#rate-limiting
[new-token]: https://github.com/settings/tokens/new

## CLI

Install [github-get-cli]:

```sh
$ npm install -g github-get-cli
$ github-get --help
```

## Related

- [github-get-cli] — CLI for this module.
- [npm-get] — fetch files and list directories from npm packages.

[github-get-cli]: https://github.com/eush77/github-get-cli
[npm-get]: https://github.com/eush77/npm-get

## Install

```
npm install github-get
```

## License

MIT
