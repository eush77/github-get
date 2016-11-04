'use strict';

var test = require('tape'),
    rewire = require('rewire');


var githubGetRewired = rewire('..');
githubGetRewired.__set__('github', function (path, options, cb) {
  cb([path, options]);
});

// Runs githubGet logic up until gh-got call.
var githubGet = function () {
  var cb = arguments[arguments.length - 1];
  arguments[arguments.length - 1] = function (result) {
    cb.apply(null, result);
  };
  githubGetRewired.apply(this, arguments);
};


test('no path no options', function (t) {
  t.plan(8);

  githubGet('owner/repo', callback);
  githubGet('owner/repo/', callback);
  githubGet({ owner: 'owner', repository: 'repo' }, callback);
  githubGet({ owner: 'owner', repository: 'repo', path: '/' }, callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/');
    t.false(options.token, 'should not be present');
  }
});


test('path no options', function (t) {
  t.plan(6);

  githubGet('owner/repo/some/file', callback);
  githubGet({ owner: 'owner', repository: 'repo', path: 'some/file' },
            callback);
  githubGet({ owner: 'owner', repository: 'repo', path: '/some/file' },
            callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/some/file');
    t.false(options.token, 'should not be present');
  }
});


test('no path options', function (t) {
  t.plan(4);

  githubGet('owner/repo', { token: 'token' }, callback);
  githubGet({ owner: 'owner', repository: 'repo', token: 'token' }, callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/');
    t.equal(options.token, 'token');
  }
});


test('path options', function (t) {
  t.plan(4);

  githubGet('owner/repo/some/file', { token: 'token' }, callback);
  githubGet({ owner: 'owner', repository: 'repo', path: '/some/file',
              token: 'token' }, callback);

  function callback(path, options) {
    t.equal(path, 'repos/owner/repo/contents/some/file');
    t.equal(options.token, 'token');
  }
});
