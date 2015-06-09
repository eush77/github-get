#!/usr/bin/env node
'use strict';

var githubGet = require('./');

var help = require('help-version')(usage()).help,
    cmpby = require('cmpby'),
    chalk = require('chalk');


function usage() {
  return [
    'Usage:  github-get [-l | --long] <user> <repo> [<path>]',
    '',
    'Options:',
    '  --long, -l  Print full paths.'
  ].join('\n');
};


var listDirectory = function (directory, opts) {
  opts = opts || {};

  return directory
    .sort(cmpby(function (file) {
      // Put directories first.
      return file.type != 'dir';
    }))
    .map(function (file) {
      var path = file[opts.fullPaths ? 'path' : 'name'];
      return file.type == 'dir'
        ? chalk.bold.blue(path) + '/'
        : path;
    });
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

  function callback(err, data, contents) {
    if (err) {
      console.error(err.message);
      return process.exit(1);
    }

    if (Array.isArray(data)) {
      console.log(listDirectory(data, { fullPaths: fullPaths }).join('\n'));
    }
    else {
      process.stdout.write(contents);
    }
  }
}(process.argv.slice(2)));
