#!/usr/bin/env node
'use strict';

var githubGet = require('./');

var help = require('help-version')(usage()).help;


function usage() {
  return [
    'Usage:  github-get [-l | --long] <user> <repo> [<path>]',
    '',
    'Options:',
    '  --long, -l  Print full paths.'
  ].join('\n');
};


var contentsToString = function (contents, fullPaths) {
  if (Array.isArray(contents)) {
    return contents.map(function (file) {
      var mark = (file.type == 'dir') ? '/' : '';
      var path = fullPaths ? '/' + file.path : file.name;
      return path + mark + '\n';
    }).join('');
  }

  return contents.content;
};


(function (argv) {
  if (argv[0] == '-l' || argv[0] == '--long') {
    var fullPaths = true;
    argv.shift();
  }

  if (argv.length == 2) {
    argv.push('/');
  }
  if (argv.length != 3) {
    return help(1);
  }

  argv.push({ decode: true }, callback);
  githubGet.apply(null, argv);

  function callback(err, contents) {
    if (err) {
      console.error(err.message);
      return process.exit(1);
    }
    process.stdout.write(contentsToString(contents, fullPaths));
  }
}(process.argv.slice(2)));
