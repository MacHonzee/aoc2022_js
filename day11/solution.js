const {ParserUtils, ArrayUtils} = require("../utils");

const input = new ParserUtils().blankLines.lines.parse(__dirname).map(group => {
  return {
    items: group[1].trim().replace("Starting items: ", "").split(", ").map(Number),
    setNew: group[2].trim().replace("Operation: new = ", ""),
    divisibleBy: parseInt(group[3].trim().replace("Test: divisible by ", "")),
    truthy: parseInt(group[4].trim().replace("If true: throw to monkey ", "")),
    falsy: parseInt(group[5].trim().replace("If false: throw to monkey ", "")),
    inspected: 0,
  };
});

// part 1
let monkeys = input.deepCopy();
ArrayUtils.nTimes(20, () => {
  monkeys.forEach(monkey => {
    monkey.items.forEach(old => {
      monkey.inspected++;

      let newLevel = eval(monkey.setNew);
      newLevel = Math.floor(newLevel / 3);
      if (newLevel % monkey.divisibleBy === 0) {
        monkeys[monkey.truthy].items.push(newLevel);
      } else {
        monkeys[monkey.falsy].items.push(newLevel);
      }
    });

    monkey.items = [];
  });
});
console.log("-> partOne", monkeys.map(monkey => monkey.inspected).sort((a, b) => b - a).slice(0, 2).product());

// part 2
monkeys = input.deepCopy();
const lcm = monkeys.map(monkey => monkey.divisibleBy).product();

ArrayUtils.nTimes(10000, () => {
  monkeys.forEach(monkey => {
    monkey.items.forEach(old => {
      monkey.inspected++;

      let newLevel = eval(monkey.setNew) % lcm;
      if (newLevel % monkey.divisibleBy === 0) {
        monkeys[monkey.truthy].items.push(newLevel);
      } else {
        monkeys[monkey.falsy].items.push(newLevel);
      }
    });

    monkey.items = [];
  });
});
console.log("-> partTwo", monkeys.map(monkey => monkey.inspected).sort((a, b) => b - a).slice(0, 2).product());
