'use strict';

var split = require('../lib/split-github-path');

var test = require('tape');


test('split github path', function (t) {
  ['', '/', 'owner', 'owner/', 'owner//path', '/repo', '/repo/', '/repo/path']
    .forEach(function (path) {
      t.throws(split.bind(null, path), Error,
               'owner and repository are required');
    });

  [split('owner/repo'), split('owner/repo/')].forEach(function (parts) {
    t.deepEqual(parts, { owner: 'owner', repository: 'repo' },
                'owner, repository');
  });

  t.deepEqual(split('owner/repo/path'),
              { owner: 'owner', repository: 'repo', path: '/path' },
              'owner/repo/path');

  t.deepEqual(split('owner/repo/path/to/dir/'),
              { owner: 'owner', repository: 'repo', path: '/path/to/dir' },
              'owner/repo/path/to/dir/');

  t.end();
});
