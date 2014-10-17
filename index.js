var request = require('request');

var getDataFromDoi = function(doi) {
  if (doi === null) return;
  var api = 'http://api.altmetric.com/v1/doi/';

  return request({
    uri: api + doi,
    method: 'GET',
    protocol: 'http:'
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return body;
    }
  });
};


exports.getDataFromDoi = getDataFromDoi;