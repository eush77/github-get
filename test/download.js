'use strict';

var githubGet = require('..');

var test = require('tape');

var fs = require('fs');


test('download directory listing', function (t) {
  githubGet('eush77/github-get', function (err, listing) {
    t.error(err);
    t.ok(listing.indexOf('index.js') >= 0 &&
         listing.indexOf('LICENSE') >= 0 &&
         listing.indexOf('node_modules') == -1,
         'should return a directory listing');
    t.end();
  });
});


test('download file', function (t) {
  githubGet('eush77/github-get/LICENSE', function (err, content) {
    t.error(err);
    t.equal(content,
            fs.readFileSync(__dirname + '/../LICENSE', { encoding: 'utf8' }),
            'should return file content');
    t.end();
  });
});
