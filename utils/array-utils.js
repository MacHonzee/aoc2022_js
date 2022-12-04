Array.prototype.nTimes = function(n, cb) {
  for (let i = 0; i < n; i++) {
    cb(i);
  }
};

Array.prototype.rangeTimes = function (from, to, cb) {
  for (let i = from; i <= to; i++) {
    cb(i);
  }
};

Array.prototype.sum = function (itemCb) {
  return this.reduce((sum, item) => {
    if (itemCb) return sum + itemCb(item);
    return sum + item;
  }, 0);
};

Array.prototype.product = function (itemCb) {
  return this.reduce((sum, item) => {
    if (itemCb) return sum * itemCb(item);
    return sum * item;
  }, 1);
};
