#!/usr/bin/env node
'use strict';

var githubGet = require('./');

var help = require('help-version')(usage()).help,
    lsView = require('ls-view'),
    filePager = require('file-pager'),
    minimist = require('minimist');


function usage() {
  return [
    'Usage:  github-get [-l | --long] [--pager] <user> <repo> [<path>]',
    '',
    'Options:',
    '  --long, -l  Print full paths.',
    '  --pager     Open in pager.'
  ].join('\n');
};


var opts = minimist(process.argv.slice(2), {
  boolean: ['long', 'pager'],
  alias: {
    long: 'l'
  },
  unknown: function (opt) {
    if (opt[0] == '-') {
      help(1);
    }
  }
});


var listDirectory = function (directory, opts) {
  return lsView(directory.map(function (file) {
    return {
      name: opts.fullPaths ? file.path : file.name,
      type: file.type == 'dir' ? 'directory' : 'file'
    };
  }));
};


(function (opts, argv) {
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
      console.log(listDirectory(data, { fullPaths: opts.long }));
    }
    else if (opts.pager) {
      filePager({ basename: encodeURIComponent(data.path) })
        .end(contents);
    }
    else {
      process.stdout.write(contents);
    }
  }
}(opts, opts._));
