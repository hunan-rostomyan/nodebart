// e.g. '{last}, {first}'.format({first: 'John', last: 'Doe'})
//       => 'Doe, John'
String.prototype.format = function(params) {
  if (!params) {throw new Error('No arguments passed');}
  return this.replace(/\{([a-zA-Z0-9]+)\}/g, function() {
    var key = arguments[1];
    if (params.hasOwnProperty(key)) {
      return params[key];
    } else {
      return arguments[0];
    }
  });
};
