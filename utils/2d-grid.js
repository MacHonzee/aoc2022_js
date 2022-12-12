const ArrayUtils = require("./array-utils");
const ParserUtils = require("./parser-utils");

class Grid2d {
  constructor({gridData, dirname, numbers}) {
    if (dirname) {
      const parser = new ParserUtils().lines.characters;
      if (numbers) {
        parser.numbers;
      }
      this._data = parser.parse(dirname);
    } else {
      this._data = gridData;
    }

    this._calculateRowLength();
  }

  eachRow(cb) {
    this._data.forEach(cb);
  }

  eachColumn(cb) {
    ArrayUtils.nTimes(this._rowLength, (i) => {
      let column = this.getCol(i);
      cb(column, i);
    });
  }

  eachCell(cb) {
    ArrayUtils.nTimes(this._data.length, (rowI) => {
      ArrayUtils.nTimes(this._data[rowI].length, (columnI) => {
        let cell = this._data[rowI][columnI];
        cb(cell, rowI, columnI);
      });
    });
  }

  eachInnerCell(cb) {
    ArrayUtils.rangeTimes(1, this._data.length - 1, (rowI) => {
      ArrayUtils.rangeTimes(1, this._data[rowI].length - 1, (columnI) => {
        let cell = this._data[rowI][columnI];
        cb(cell, rowI, columnI);
      });
    });
  }

  getNeighbours(rowI, columnI, diagonals = false) {
    return this.getNeighbourCoords(rowI, columnI, diagonals).map(([rowI, colI]) => this.data[rowI][colI]);
  }

  getNeighbourCoords(rowI, columnI, diagonals = false) {
    let neighborIndexes = [];

    let notOnFirstRow = rowI > 0;
    let notInFirstColumn = columnI > 0;
    let notOnLastRow = rowI < this._data.length - 1;
    let notInLastColumn = columnI < this._rowLength - 1;

    // top row
    if (diagonals && notOnFirstRow && notInFirstColumn) neighborIndexes.push([rowI - 1, columnI - 1]);
    if (notOnFirstRow) neighborIndexes.push([rowI - 1, columnI]);
    if (diagonals && notOnFirstRow && notInLastColumn) neighborIndexes.push([rowI - 1, columnI + 1]);

    // middle row
    if (notInFirstColumn) neighborIndexes.push([rowI, columnI - 1]);
    if (notInLastColumn) neighborIndexes.push([rowI, columnI + 1]);

    // bottom row
    if (diagonals && notOnLastRow && notInFirstColumn) neighborIndexes.push([rowI + 1, columnI - 1]);
    if (notOnLastRow) neighborIndexes.push([rowI + 1, columnI]);
    if (diagonals && notOnLastRow && notInLastColumn) neighborIndexes.push([rowI + 1, columnI + 1]);

    return neighborIndexes;
  }

  visualize() {
    console.log(this.rawData);
  }

  copy() {
    let newData = this._data.map(line => [...line]);
    return new Grid2d(newData);
  }

  get rowCount() {
    return this._data.length;
  }

  get colCount() {
    return this._rowLength;
  }

  set data(data) {
    this._data = data;
    this._calculateRowLength();
  }

  get data() {
    return this._data;
  }

  get rawData() {
    return this._data.map(line => line.join("")).join("\n");
  }

  getRow(index) {
    return this._data[index];
  }

  getCol(index) {
    return this._data.map(row => row[index]);
  }

  getCell(rowI, colI) {
    return this._data[rowI]?.[colI];
  }

  setCell(rowI, colI, value) {
    this._data[rowI][colI] = value;
  }

  findIndex(cb) {
    for (let colI = 0; colI < this.colCount; colI++) {
      for (let rowI = 0; rowI < this.rowCount; rowI++) {
        let found = cb(this.getCell(rowI, colI));
        if (found) return [rowI, colI];
      }
    }
  }

  _calculateRowLength() {
    this._rowLength = this._data[0] ? this._data[0].length : 0;
  }
}

module.exports = Grid2d;
