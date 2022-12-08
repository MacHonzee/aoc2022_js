Object.prototype.makePretty = function () {
  return JSON.stringify(this, null, 2);
};

Object.prototype.eachKey = function (cb) {
  Object.keys(this).forEach(cb);
};

Object.prototype.eachValue = function (cb) {
  Object.values(this).forEach(cb);
};

Object.prototype.eachEntry = function (cb) {
  Object.entries(this).forEach(cb);
};
