const ParserUtils = require("../utils/parser-utils");
require("../utils/array-utils");

const calories = new ParserUtils().blankLines.lines.numbers.parse(__dirname);

// part 1
const dwarfCalories = calories.map(group => group.sum());
console.log("-> dwarfCalories", Math.max(...dwarfCalories));

// part 2
const top3dwarves = dwarfCalories.sort((a, b) => b - a).slice(0, 3);
console.log("-> top3dwarves", top3dwarves.sum());
