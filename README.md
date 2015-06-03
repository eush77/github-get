[![npm](https://nodei.co/npm/github-get.png)](https://nodei.co/npm/github-get/)

# github-get

[![Dependency Status][david-badge]][david]

Fetch files and list directories via GitHub API.

[david]: https://david-dm.org/eush77/github-get
[david-badge]: https://david-dm.org/eush77/github-get.png

## API

### `githubGet(owner, repo, [path], callback(err, data))`

`path` defaults to `/`.

## CLI

### `github-get <user> <repo> [<path>]`

Lists directory or cats file contents at `<path>`.

`<path>` defaults to `/`.

## Install

```
npm install github-get
```

## License

MIT
