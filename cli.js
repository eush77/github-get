#!/usr/bin/env node
'use strict';

var githubGet = require('./');

var help = require('help-version')(usage()).help;


function usage() {
  return 'github-get <user> <repo> [<path>]';
};


var contentsToString = function (contents) {
  if (Array.isArray(contents)) {
    return contents.map(function (file) {
      var mark = (file.type == 'dir') ? '/' : '';
      return file.name + mark + '\n';
    }).join('');
  }

  if (contents.encoding != 'base64') {
    throw new Error('Unknown encoding: ' + contents.encoding);
  }

  return Buffer(contents.content, 'base64').toString();
};


(function (argv) {
  if (argv.length == 2) {
    argv.push('/');
  }
  if (argv.length != 3) {
    return help(1);
  }

  argv.push(callback);
  githubGet.apply(null, argv);

  function callback(err, contents) {
    if (err) throw err;
    process.stdout.write(contentsToString(contents));
  }
}(process.argv.slice(2)));
