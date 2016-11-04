'use strict';

var splitGithubPath = require('./lib/split-github-path');

var github = require('gh-got'),
    assign = require('object.assign');


module.exports = function (githubPath, options, cb) {
  if (typeof githubPath != 'string') {
    // Shift arguments.
    cb = options;
    options = githubPath;
    githubPath = null;
  }

  if (typeof options != 'object') {
    // Shift arguments.
    cb = options;
    options = {};
  }

  // Mix in all options.
  var defaults = {
    json: true,
    headers: {
      'User-Agent': 'github-get'
    }
  };
  options = assign(defaults,
                   githubPath ? splitGithubPath(githubPath) : {},
                   options);

  // Extract specific options.
  var owner = options.owner;
  var repo = options.repository;
  var path = options.path;
  delete options.owner;
  delete options.repository;
  delete options.path;

  // If path has a leading `/`, remove it.
  if (path && path[0] == '/') {
      path = path.slice(1);
  }

  // If enabled, file content will be decoded.
  if (options.decode == null || options.decode) {
    var decode = true;
    delete options.decode;
  }

  github(['repos', owner, repo, 'contents', path].join('/'), options,
         function (err, data) {
           if (err) return cb(err);

           var content;

           // File.
           if (data.content) {
             if (decode) {
               try {
                 data.content = Buffer(data.content, data.encoding).toString();
               }
               catch (err) {
                 return cb(err);
               }
             }
             content = data.content;
           }

           // Directory.
           else {
             content = data.map(function (file) {
               return file.name;
             });
           }

           return cb(null, content, data);
         });
};
