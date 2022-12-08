const {ParserUtils} = require("../utils");

const input = new ParserUtils().lines.parse(__dirname);

const ROOT = "ROOT";

// part 1
const dirs = {
  [ROOT]: {
    files: []
  },
};

let currentPath = ROOT;

input.forEach(line => {
  if (line.startsWith("$")) {
    if (line.startsWith("$ cd")) {
      if (line.startsWith("$ cd ..")) {
        let newPath = currentPath.split("/");
        newPath.pop();
        currentPath = newPath.join("/") || ROOT;
      } else if (line.startsWith("$ cd /")) {
        currentPath = ROOT;
      } else {
        currentPath = currentPath + "/" + line.replace("$ cd ", "");
      }
    }

  } else if (line.startsWith("dir")) {
    const dirName = line.split(" ")[1];
    const dirPath = `${currentPath}/${dirName}`;
    dirs[dirPath] = dirs[dirPath] || {parent: currentPath, files: []};
    dirs[currentPath].files.push([dirName, "dir"]);

  } else {
    const [size, file] = line.split(" ");
    dirs[currentPath].files.push([file, parseInt(size)]);
  }
});

function countSize(dir) {
  let totalSize = 0;
  for (let file of dirs[dir].files) {
    const [name, size] = file;
    if (size === "dir") {
      totalSize += countSize(dir + "/" + name);
    } else {
      totalSize += size;
    }
  }

  dirs[dir].totalSize = totalSize;
  return totalSize;
}

countSize(ROOT);

console.log("-> partOne", Object.keys(dirs).filter(dir => dirs[dir].totalSize <= 100000).sum(dir => dirs[dir].totalSize));

// part 2
const MAX_SPACE = 70000000;
const NEEDED = 30000000;
const USED = dirs[ROOT].totalSize;
const SMALLEST_TO_DELETE = USED - (MAX_SPACE- NEEDED);

console.log("-> partTwo", Math.min(...Object.keys(dirs).filter(dir => dirs[dir].totalSize >= SMALLEST_TO_DELETE).map(dir => dirs[dir].totalSize)));
