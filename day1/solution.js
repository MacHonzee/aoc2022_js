const ParserUtils = require("../utils/parser-utils");
const Utils = require("../utils/iteration-utils");

const calories = new ParserUtils().blankLines.lines.numbers.parse(__dirname);

// part 1
const dwarfCalories = calories.map(group => Utils.arraySum(group));
console.log("-> dwarfCalories", Math.max(...dwarfCalories));

// part 2
const top3dwarves = dwarfCalories.sort((a, b) => b - a).slice(0, 3);
console.log("-> top3dwarves", Utils.arraySum(top3dwarves));
