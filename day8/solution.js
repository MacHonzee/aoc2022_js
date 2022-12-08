const {Grid2d} = require("../utils");

const input = new Grid2d({dirname: __dirname, numbers: true});

// part 1
let invisibleCount = 0;
input.eachInnerCell((cell, rowI, columnI) => {
  let visible = true;
  for (let i = 0; i < rowI; i++) {
    const cell2 = input.getCell(i, columnI);
    if (cell2 >= cell) {
      visible = false;
      break;
    } else {
      visible = true;
    }
  }

  if (!visible) {
    for (let i = rowI + 1; i < input.rowCount; i++) {
      const cell2 = input.getCell(i, columnI);
      if (cell2 >= cell) {
        visible = false;
        break;
      } else {
        visible = true;
      }
    }
  }

  if (!visible) {
    for (let i = 0; i < columnI; i++) {
      const cell2 = input.getCell(rowI, i);
      if (cell2 >= cell) {
        visible = false;
        break;
      } else {
        visible = true;
      }
    }
  }

  if (!visible) {
    for (let i = columnI + 1; i < input.colCount; i++) {
      const cell2 = input.getCell(rowI, i);
      if (cell2 >= cell) {
        visible = false;
        break;
      } else {
        visible = true;
      }
    }
  }

  if (!visible) {
    invisibleCount++;
  }
});

const treeCount = input.colCount * input.rowCount;
console.log("-> partOne", treeCount - invisibleCount);

// part 2
const factors = [];
input.eachInnerCell((cell, rowI, columnI) => {
  let factor = 1;

  let current = 0;
  for (let i = rowI - 1; i >= 0; i--) {
    current++;

    const cell2 = input.getCell(i, columnI);
    if (cell2 >= cell) {
      break;
    }
  }
  factor *= current;

  current = 0;
  for (let i = rowI + 1; i < input.rowCount; i++) {
    current++;

    const cell2 = input.getCell(i, columnI);
    if (cell2 >= cell) {
      break;
    }
  }
  factor *= current;

  current = 0;
  for (let i = columnI - 1; i >= 0; i--) {
    current++;

    const cell2 = input.getCell(rowI, i);
    if (cell2 >= cell) {
      break;
    }
  }
  factor *= current;

  current = 0;
  for (let i = columnI + 1; i < input.colCount; i++) {
    current++;

    const cell2 = input.getCell(rowI, i);
    if (cell2 >= cell) {
      break;
    }
  }
  factor *= current;

  factors.push(factor);
});

console.log("-> partTwo", Math.max(...factors));
