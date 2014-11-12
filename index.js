var request = require('browser-request');
var through2 = require('through2');
// accum is like concat-stream, but as an obj stream2.
var accum = require('accum-transform');

var builder = require('../beagle-builder');

var api = 'http://api.altmetric.com/v1/doi/';

var getDataFromDoi = function(doi, callback) {
  if (doi === null)
    cb(new Error("no doi"));

  var reqOpts = {
    uri: api + doi,
    method: 'GET',
    protocol: 'http:',
    json: 'true'
  };

  return request(reqOpts, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // body is already parsed (json:true above)
      // need to call the callback we were given.
      callback(null, body);
    }
  });
};

var getDataFromDoiStream = function(doi) {
  if (doi === null)
    throw new Error("no doi"); // throws because programmer error.

  var reqStream = request({
    uri: api + doi,
    method: 'GET',
    protocol: 'http:'
  });

  var parse = through2.obj(function (data, enc, done) {
    this.push(JSON.parse(data));
    done();
  });

  // when using pipe in requests, we get raw data. so need to parse it.
  return reqStream
    .pipe(accum())
    .pipe(parse);
};

var buildHTML = function(JSON, templates) {
  builder.buildHTML('beagle-altmetrics', JSON, templates);
};

exports.buildHTML = buildHTML;
exports.getDataFromDoi = getDataFromDoi;
exports.getDataFromDoiStream = getDataFromDoiStream;
