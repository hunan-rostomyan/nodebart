var get = require('./util/http').get;
var logger = require('./util/logger');
require('./util/string');

function Bart(settings) {
  this.URL = settings.URL.format({
    key: process.env.BART_KEY || settings.KEY
  });
}

Bart.prototype.stationList = function(cb) {
  var url = this.buildURL('stn', {cmd: 'stns'});
  get(url, function(result) {
    try {
      cb(result.root.stations[0].station);
    } catch (e) {
      logger.error('stationList')(e);
    }
  });
  return this;
};

Bart.prototype.departures = function(from, cb) {
  var url = this.buildURL('etd', {cmd: 'etd', orig: from});
  get(url, function(result) {
    try {
      var station = result.root.station[0];
      cb(station.name[0], station.etd);
    } catch (e) {
      logger.error('departures')(e);
    }
  });
  return this;
};

Bart.prototype.buildURL = function(service, params) {
  var commands = Object.keys(params).reduce(function(cmd, key) {
	var val = params[key];
    return [cmd,
      ['&', key, '=', val || '{' + key + '}'].join('')
    ].join('');
  }, '');

  return this.URL
    .format({service: service})
    .format({commands: commands});
};

module.exports = function(settings) {
  return new Bart(settings);
};
