const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");

const LINE_SEP = os.EOL;

class ParserUtils {
  get lines() {
    this._byLines = true;
    return this;
  }

  get blankLines() {
    this._byBlankLines = true;
    return this;
  }

  get numbers() {
    this._numbers = true;
    return this;
  }

  get spaces() {
    this._spaces = true;
    return this;
  }

  parse(rootPath) {
    const inputPath = path.join(rootPath, "input.txt");

    let output = fs.readFileSync(inputPath, "utf-8").trim();

    if (this._byBlankLines) {
      output = output.split(LINE_SEP + LINE_SEP);
    }

    if (this._byLines) {
      if (typeof output === "string") {
        output = output.split(LINE_SEP);
      } else {
        output = output.map(itemGroup => itemGroup.split(LINE_SEP));
      }
    }

    if (this._numbers) {
      // TODO consider single line / no blank lines once it is necessary
      output.forEach((itemGroup, i) => itemGroup.forEach((item, y) => output[i][y] = parseInt(item)));
    }

    if (this._spaces) {
      output = output.map(itemGroup => itemGroup.split(" "));
    }

    return output;
  }
}

module.exports = ParserUtils;
