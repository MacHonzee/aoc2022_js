class ArrayUtils {
  nTimes(n, cb) {
    for (let i = 0; i < n; i++) {
      cb(i);
    }
  }

  rangeTimes(from, to, cb) {
    for (let i = from; i <= to; i++) {
      cb(i);
    }
  }
}

Array.prototype.sum = function (itemCb) {
  return this.reduce((sum, item) => {
    if (itemCb) return sum + itemCb(item);
    return sum + item;
  }, 0);
};

Array.prototype.product = function (itemCb) {
  return this.reduce((product, item) => {
    if (itemCb) return product * itemCb(item);
    return product * item;
  }, 1);
};

module.exports = new ArrayUtils();
