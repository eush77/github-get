'use strict';

var github = require('gh-got');


module.exports = function (owner, repo, path, cb) {
  if (typeof path == 'function') {
    cb = path;
    path = '';
  }

  if (path[0] == '/') {
    path = path.slice(1);
  }

  github(['repos', owner, repo, 'contents', path].join('/'), {
    json: true,
    headers: {
      'User-Agent': 'github-get'
    }
  }, cb);
};
