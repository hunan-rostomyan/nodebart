function error(str) {
  return function(error) {
    console.error([str, error].join(':'));
  };
}

module.exports = {error: error};
