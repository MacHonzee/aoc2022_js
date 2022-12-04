const ParserUtils = require("../utils/parser-utils");
require("../utils/array-utils");

const rucksacks = new ParserUtils().lines.parse(__dirname);

const CHAR_CODE_a = "a".charCodeAt(0);
const ALPHABET_LOW = Array.from(Array(26)).map((e, i) => i + CHAR_CODE_a).map((x) => String.fromCharCode(x));

const CHAR_CODE_A = "A".charCodeAt(0);
const ALPHABET_HIGH = Array.from(Array(26)).map((e, i) => i + CHAR_CODE_A).map((x) => String.fromCharCode(x));

// part one
function calculateValue(char) {
  if (ALPHABET_LOW.includes(char)) return ALPHABET_LOW.indexOf(char) + 1;
  if (ALPHABET_HIGH.includes(char)) return ALPHABET_HIGH.indexOf(char) + 27;
}

const duplicates = [];
for (let rucksack of rucksacks) {
  const middleI = (rucksack.length / 2);
  const firstHalf = rucksack.slice(0, middleI);
  const secondHalf = rucksack.slice(middleI);

  for (let char of firstHalf) {
    if (secondHalf.includes(char)) {
      duplicates.push(char);
      break;
    }
  }
}
console.log("-> part one", duplicates.sum(calculateValue));

// part two
const groupsOfThree = [[]];
for (let rucksack of rucksacks) {
  if (groupsOfThree.at(-1).length < 3) {
    groupsOfThree.at(-1).push(rucksack);
  } else {
    groupsOfThree.push([rucksack]);
  }
}
if (groupsOfThree.at(-1).length === 0) groupsOfThree.pop();

const commonItems = [];
for (let groupOfThree of groupsOfThree) {
  for (let char of groupOfThree[0]) {
    if (groupOfThree.every(rucksack => rucksack.includes(char))) {
      commonItems.push(char);
      break;
    }
  }
}
console.log("-> commonItems", commonItems.sum(calculateValue));
