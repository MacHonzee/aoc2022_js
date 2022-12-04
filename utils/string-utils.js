String.prototype.setCharAt = function (char, i) {
  return this.substr(0, i) + char + this.substr(i + 1);
};
