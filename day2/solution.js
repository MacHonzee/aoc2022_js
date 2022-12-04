const ParserUtils = require("../utils/parser-utils");

const ENEMY = ["A", "B", "C"]; // rock, paper, scissors
const YOU = ["X", "Y", "Z"];
const POINTS = [1, 2, 3];

const MATRIX = new Map();
MATRIX.set(0, [2, 1]); // first index -> win, second index -> lose
MATRIX.set(1, [0, 2]);
MATRIX.set(2, [1, 0]);

const strategyGuide = new ParserUtils().lines.spaces.parse(__dirname);

// part one
let yourPoints = 0;
strategyGuide.forEach(round => {
  const enemyIdx = ENEMY.indexOf(round[0]);
  const yourIdx = YOU.indexOf(round[1]);

  yourPoints += POINTS[yourIdx];

  const matrix = MATRIX.get(enemyIdx);
  if (matrix[1] === yourIdx) {
    yourPoints += 6;
  } else if (enemyIdx === yourIdx) {
    yourPoints += 3;
  }
});
console.log("-> yourPoints", yourPoints);

// part two
yourPoints = 0;
strategyGuide.forEach(round => {
  const enemyIdx = ENEMY.indexOf(round[0]);
  const matrix = MATRIX.get(enemyIdx);

  let yourIdx;
  switch (round[1]) {
  case "X":
    yourIdx = matrix[0];
    break;
  case "Y":
    yourIdx = enemyIdx;
    break;
  case "Z":
    yourIdx = matrix[1];
    break;
  }

  yourPoints += POINTS[yourIdx];

  if (matrix[1] === yourIdx) {
    yourPoints += 6;
  } else if (enemyIdx === yourIdx) {
    yourPoints += 3;
  }
});
console.log("-> yourPoints", yourPoints);
