'use strict';

var test = require('tape'),
    rewire = require('rewire');


var githubGet = rewire('..');
githubGet.__set__('github', function (path, options, cb) {
  cb(path, options);
});


test('no path no options', function (t) {
  t.plan(4);

  githubGet('owner', 'repo', callback);
  githubGet('owner/repo', callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/');
    t.false(options.token, 'should not be present');
  }
});


test('path no options', function (t) {
  t.plan(4);

  githubGet('owner', 'repo', '/some/file', callback);
  githubGet('owner/repo', '/some/file', callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/some/file');
    t.false(options.token, 'should not be present');
  }
});


test('no path options', function (t) {
  t.plan(4);

  githubGet('owner', 'repo', { token: 'token' }, callback);
  githubGet('owner/repo', { token: 'token' }, callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/');
    t.equal(options.token, 'token');
  }
});


test('path options', function (t) {
  t.plan(4);

  githubGet('owner', 'repo', 'some/file', { token: 'token' }, callback);
  githubGet('owner/repo', 'some/file', { token: 'token' }, callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/some/file');
    t.equal(options.token, 'token');
  }
});
