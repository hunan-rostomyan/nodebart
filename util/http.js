var http = require('http');
var parseXML = require('xml2js').parseString;

function get(url, success) {
  http.get(url, function(res) {

    // Accumulate the xml
    var xml = '';
    res.on('data', function(chunk) {xml += chunk;});

    // Parse the xml and pass to success
    res.on('end', function() {
      parseXML(xml, function(err, result) {
        success(result);
      });
    });

  }).on('error', function(e) {
    console.error('Error getting: ' + url);
  });
};

module.exports = {get: get};
