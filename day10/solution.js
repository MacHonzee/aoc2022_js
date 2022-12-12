const {ParserUtils} = require("../utils");

const input = new ParserUtils().lines.spaces.parse(__dirname).map(line => [line[0], line[1] && parseInt(line[1])]);

// part 1
const cycleLog = [
  1
];

for (let op of input) {
  if (op[0] === "noop") {
    cycleLog.push(cycleLog.at(-1));
  } else {
    cycleLog.push(cycleLog.at(-1));
    cycleLog.push(cycleLog.at(-1) + op[1]);
  }
}
console.log("-> cycleLog", cycleLog);
console.log("-> cycleLog.length", cycleLog.length);

const finals = [];
for (let i = 20; i <= 220; i += 40) {
  finals.push(cycleLog[i - 1] * i);
}

console.log("-> partOne", finals.sum());

// part 2
console.log("-> partTwo");
for (let y = 0; y < 6; y++) {
  const row = new Array(40);

  for (let i = 0; i <= 39; i++) {
    const sprite = cycleLog[(y * 40) + i];

    if (sprite - 1 === i || sprite === i || sprite + 1 === i) {
      row.push("#");
    } else {
      row.push(".");
    }
  }

  console.log(row.join(""));
}

