const ParserUtils = require("../utils/parser-utils");
require("../utils/array-utils");

const sequence = new ParserUtils().parse(__dirname);

// part 1
for (let i = 0; i < sequence.length; i++) {
  if (
    sequence[i] !== sequence[i + 1] && sequence[i] !== sequence[i + 2] && sequence[i] !== sequence[i + 3] &&
      sequence[i + 1] !== sequence[i + 2] && sequence[i + 1] !== sequence[i + 3] &&
      sequence[i + 2] !== sequence[i + 3]
  ) {
    console.log("part one", i + 4);
    break;
  }
}

// part 2
for (let i = 0; i < sequence.length; i++) {
  const chars = new Set(sequence.slice(i, i + 14).split(""));

  if (chars.size === 14) {
    console.log("part two", i + 14);
    break;
  }
}
