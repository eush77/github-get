'use strict';

var test = require('tape'),
    rewire = require('rewire');


var githubGet = rewire('..');
githubGet.__set__('github', function (path, options, cb) {
  cb(path, options);
});


test(function (t) {
  t.plan(8);

  githubGet('owner', 'repo', function (path, options) {
    t.equal(path, 'repos/owner/repo/contents/');
    t.deepEqual(options, {});
  });

  githubGet('owner', 'repo', '/some/file', function (path, options) {
    t.equal(path, 'repos/owner/repo/contents/some/file');
    t.deepEqual(options, {});
  });

  githubGet('owner', 'repo', { token: 'token' }, function (path, options) {
    t.equal(path, 'repos/owner/repo/contents/');
    t.deepEqual(options, { token: 'token' });
  });

  githubGet('owner', 'repo', 'some/file', { token: 'token' }, function (path, options) {
    t.equal(path, 'repos/owner/repo/contents/some/file');
    t.deepEqual(options, { token: 'token' });
  });
});
