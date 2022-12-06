class NumUtils {
  decimalToBinary(num) {
    return num.toString(2);
  }

  binaryToDecimal(binary) {
    return parseInt(binary, 2);
  }
}

Number.prototype.within = function (left, right) {
  return this >= left && this <= right;
};

module.exports = new NumUtils();

