'use strict';


module.exports = function splitGithubPath (githubPath) {
  var path = githubPath.split('/');
  var parts = {};

  parts.owner = path.shift();
  parts.repository = path.shift();

  if (!parts.owner || !parts.repository) {
    throw Error('"' + githubPath + '" does not comform to ' +
                '"owner/repository[/path]" format');
  }

  if (path.length && path != '') {
    // Remove trailing `/`.
    if (path.slice(-1) == '') {
      path.pop();
    }

    parts.path = '/' + path.join('/');
  }

  return parts;
};
