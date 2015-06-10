#!/usr/bin/env node
'use strict';

var githubGet = require('./');

var help = require('help-version')(usage()).help,
    lsView = require('ls-view');


function usage() {
  return [
    'Usage:  github-get [-l | --long] <user> <repo> [<path>]',
    '',
    'Options:',
    '  --long, -l  Print full paths.'
  ].join('\n');
};


var listDirectory = function (directory, opts) {
  return lsView(directory.map(function (file) {
    return {
      name: opts.fullPaths ? file.path : file.name,
      type: file.type == 'dir' ? 'directory' : 'file'
    };
  }));
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

  argv.push(callback);
  githubGet.apply(null, argv);

  function callback(err, data, contents) {
    if (err) {
      console.error(err.message);
      return process.exit(1);
    }

    if (Array.isArray(data)) {
      console.log(listDirectory(data, { fullPaths: fullPaths }));
    }
    else {
      process.stdout.write(contents);
    }
  }
}(process.argv.slice(2)));
