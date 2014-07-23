var each = require('lodash.foreach');
var slash = require('slasher');
var globject = require('globject');
var url = require('fast-url-parser');

module.exports = function (headerPaths) {
  return function (req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var headersConfig = globject(slash(headerPaths));
    var headers = headersConfig(slash(pathname)) || {};
    
    each(headers, function (val, name) {
      res.setHeader(name, val);
    });
    
    return next();
  };
};
