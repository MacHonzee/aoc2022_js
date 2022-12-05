const ParserUtils = require("../utils/parser-utils");
require("../utils/array-utils");

const [crateMapRaw, movementsRaw] = new ParserUtils().blankLines.parse(__dirname);

const allLines = crateMapRaw.split(ParserUtils.LINE_SEP);
const columnCount = allLines.pop().trim().split("   ").length;
const crateMap = [];
for (let i = 0; i < columnCount; i++) {
  crateMap.push([]);
}

allLines.forEach(line => {
  for (let i = 0; i < columnCount; i++) {
    let letterI = (i * 4) + 1;
    if (line[letterI] && line[letterI] !== " ") {
      crateMap[i].push(line[letterI]);
    }
  }
});

const movements = movementsRaw.split(ParserUtils.LINE_SEP).map(line => Array.from(line.match(/\d+/g)).map(Number));

// part 1
const part1Map = JSON.parse(JSON.stringify(crateMap));
movements.forEach(move => {
  const [count, from, to] = move;

  for (let i = 0; i < count; i++) {
    if (part1Map[from - 1]) {
      part1Map[to - 1].unshift(part1Map[from - 1].shift());
    }
  }
});
console.log("part 1", part1Map.map(col => col[0]).join(""));

// part 2
const part2Map = JSON.parse(JSON.stringify(crateMap));
movements.forEach(move => {
  const [count, from, to] = move;

  const movedPart = part2Map[from - 1].splice(0, Math.min(count, part2Map[from - 1].length));
  part2Map[to - 1] = movedPart.concat(part2Map[to - 1]);
});
console.log("part 2", part2Map.map(col => col[0]).join(""));
