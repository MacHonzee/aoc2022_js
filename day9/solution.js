const {ParserUtils, ArrayUtils} = require("../utils");

const input = new ParserUtils().lines.spaces.parse(__dirname).map(line => [line[0], parseInt(line[1])]);

// part 1
let position = [0, 0];
let tailPosition = [0, 0];
const tailHistory = new Set(["0|0"]);

input.forEach(move => {
  for (let i = 0; i < move[1]; i++) {
    let previousPosition = [...position];

    if (move[0] === "U") position[1]++;
    if (move[0] === "D") position[1]--;
    if (move[0] === "R") position[0]++;
    if (move[0] === "L") position[0]--;

    if (Math.abs(position[0] - tailPosition[0]) > 1 || Math.abs(position[1] - tailPosition[1]) > 1) {
      tailPosition = previousPosition;
      tailHistory.add(tailPosition.join("|"));
    }
  }
});
console.log("-> partOne", tailHistory.size);

// part 2
function visualize() {
  const range = 15;
  for (let y = range; y >= -range; y--) {
    ArrayUtils.rangeTimes(-range, range, (x) => {
      const snakePart = snake.find(part => part[0] === x && part[1] === y);
      if (snakePart) {
        process.stdout.write("*");
      } else {
        process.stdout.write("•");
      }
    });
    console.log();
  }

  console.log();
}

const snake = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
tailHistory.clear();
tailHistory.add("0|0");

visualize();

input.forEach(move => {
  // process every move
  for (let i = 0; i < move[1]; i++) {
    let previousSnake = JSON.parse(JSON.stringify(snake));

    if (move[0] === "U") snake[0][1]++;
    if (move[0] === "D") snake[0][1]--;
    if (move[0] === "R") snake[0][0]++;
    if (move[0] === "L") snake[0][0]--;

    // move every segment of snake
    snake.forEach((part, y) => {
      if (y === 9) return;

      let currentPart = snake[y];
      let nextPart = snake[y + 1];
      if (Math.abs(nextPart[0] - currentPart[0]) > 1 || Math.abs(nextPart[1] - currentPart[1]) > 1) {

        if (currentPart[0] === nextPart[0]) {
          if (currentPart[1] > nextPart[1]) {
            // move horizontally to right
            snake[y + 1][1]++;
          } else {
            // move horizontally to left
            snake[y + 1][1]--;
          }
        } else if (currentPart[1] === nextPart[1]) {
          if (currentPart[0] > nextPart[0]) {
            // move vertically to top
            snake[y + 1][0]++;
          } else {
            // move vertically to bottom
            snake[y + 1][0]--;
          }
        } else {
          if ((currentPart[0] - nextPart[0]) === 2 && (currentPart[1] - nextPart[1]) === 2) {
            // move diagonally top right
            snake[y + 1][0]++;
            snake[y + 1][1]++;
          } else if ((currentPart[0] - nextPart[0]) === -2 && (currentPart[1] - nextPart[1]) === 2) {
            // move diagonally top left
            snake[y + 1][0]--;
            snake[y + 1][1]++;
          } else if ((currentPart[0] - nextPart[0]) === 2 && (currentPart[1] - nextPart[1]) === -2) {
            // move diagonally bottom right
            snake[y + 1][0]++;
            snake[y + 1][1]--;
          } else if ((currentPart[0] - nextPart[0]) === -2 && (currentPart[1] - nextPart[1]) === -2) {
            // move diagonally bottom left
            snake[y + 1][0]--;
            snake[y + 1][1]--;
          } else if ((currentPart[1] - nextPart[1]) === 2) {
            // move diagonally to top
            snake[y + 1][0] = snake[y][0];
            snake[y + 1][1]++;
          } else if ((currentPart[1] - nextPart[1]) === -2) {
            // move diagonally to bottom
            snake[y + 1][0] = snake[y][0];
            snake[y + 1][1]--;
          } else if ((currentPart[0] - nextPart[0]) === 2) {
            // move diagonally to the right
            snake[y + 1][1] = snake[y][1];
            snake[y + 1][0]++;
          } else if ((currentPart[0] - nextPart[0]) === -2){
            // move diagonally to the left
            snake[y + 1][1] = snake[y][1];
            snake[y + 1][0]--;
          }
        }

        tailHistory.add(snake[9].join("|"));
      }
    });

    // visualize();
  }
});

console.log("-> partTwo", tailHistory.size);
