'use strict';

var github = require('gh-got'),
    assign = require('object.assign');


module.exports = function (/* owner, repo, path, options, cb */) {
  var args = [].slice.call(arguments);

  // Callback is always last.
  var cb = args.pop();

  // Owner/repo may be one or two arguments.
  var owner = args.shift();
  var slash = owner.indexOf('/');
  if (slash >= 0) {
    args.unshift(owner.slice(slash + 1));
    owner = owner.slice(0, slash);
  }
  var repo = args.shift();

  // Remove leading slash from path.
  var path = args.shift();
  if (typeof path != 'string') {
    args.unshift(path);
    path = '';
  }
  else if (path[0] == '/') {
    path = path.slice(1);
  }

  // Mix in predefined options.
  var options = args.shift();
  if (typeof options != 'object') {
    options = {};
  }
  options = assign({
    json: true,
    headers: {
      'User-Agent': 'github-get'
    }
  }, options);

  // If enabled, file content will be decoded.
  if (options.decode) {
    delete options.decode;
    var oldCb = cb;
    cb = function (err, data) {
      if (err) return oldCb(err);
      if (data.content) {
        try {
          data.content = Buffer(data.content, data.encoding).toString();
        }
        catch (err) {
          return oldCb(err);
        }
      }
      return oldCb(null, data);
    };
  }

  github(['repos', owner, repo, 'contents', path].join('/'), options, cb);
};
