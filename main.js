var settings = require('./settings');
var Bart = require('./bart.js');
require('./util/string');

var bart = Bart(settings.BART);

// Display list of stations
bart.stationList(function(stations) {
  stations.forEach(function(s) {
    console.log('{abbr} - {name}'.format({name: s.name, abbr: s.abbr}));
  });
});

// Display departures from Downtown Berkeley
var from = 'dbrk';
bart.departures(from, function(stationName, departures) {
  var out = stationName + '\n';
  out += departures.map(function(d) {
    return d.estimate.reduce(function(out, est) {
      return out + ' \t# ' + est.minutes[0] + ' min (' + est.length[0] + ' car)';
    }, d.destination[0]);
  }).join('\n');
  console.log(out);
});
