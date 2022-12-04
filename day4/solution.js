const ParserUtils = require("../utils/parser-utils");
require("../utils/array-utils");
require("../utils/number-utils");

const tasks = new ParserUtils().lines.parse(__dirname);

// part 1
let overlappingCount = 0;
tasks.forEach(task => {
  const [[firstStart, firstEnd], [secondStart, secondEnd]] = task.split(",").map(areas => areas.split("-").map(Number));
  if ((firstStart <= secondStart && firstEnd >= secondEnd) || (firstStart >= secondStart && firstEnd <= secondEnd)) {
    overlappingCount++;
  }
});
console.log("-> overlappingCount", overlappingCount);

// part 2
let allOverlapCount = 0;
tasks.forEach(task => {
  const [[firstStart, firstEnd], [secondStart, secondEnd]] = task.split(",").map(areas => areas.split("-").map(Number));
  if (firstStart.within(secondStart, secondEnd) ||
      firstEnd.within(secondStart, secondEnd) ||
      secondStart.within(firstStart, firstEnd) ||
      secondEnd.within(firstStart, firstEnd)
  ) {
    allOverlapCount++;
  }
});
console.log("-> allOverlapCount", allOverlapCount);

