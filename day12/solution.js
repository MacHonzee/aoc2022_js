const {Grid2d} = require("../utils");
const Heap = require("heap");
const chalk = require("chalk");

const grid = new Grid2d({dirname: __dirname});

const ELEVATION_ORDER = "abcdefghijklmnopqrstuvwxyz".split("");

// part 1
function reconstructPath(cameFrom, current) {
  let totalPath = [{ coords: current }];
  while (current in cameFrom) {
    current = cameFrom[current];
    totalPath.unshift({ coords: current });
  }
  return totalPath;
}

function countDistance(coords, endCoords) {
  let [x, y] = coords.split(",").map(Number);
  let [endX, endY] = endCoords.split(",").map(Number);
  return Math.abs(endX - x) + Math.abs(endY - y);
}

function getElevation(grid, rowI, colI) {
  let elev = grid.getCell(rowI, colI);
  if (elev === "S") elev = "a"; // Start is at "a" elevation
  if (elev === "E") elev = "z"; // End is at "z" elevation
  return elev;
}

function getNeighbors(grid, coords) {
  let [rowI, colI] = coords.split(",").map(Number);

  let neighbors = grid.getNeighbourCoords(rowI, colI);

  let currentElev = getElevation(grid, rowI, colI);

  const currentElevOrder = ELEVATION_ORDER.indexOf(currentElev);

  neighbors = neighbors.filter(neigh => {
    const neighElev = getElevation(grid, neigh[0], neigh[1]);
    return ELEVATION_ORDER.indexOf(neighElev) - currentElevOrder <= 1;
  });

  return { neighbors, neighborStrings: neighbors.map(coord => coord.join(",")) };
}

function aStarSearch(start, end, grid) {
  const openSet = new Heap((a, b) => a.fScore - b.fScore);

  const startDistance = countDistance(start, end);
  openSet.push({ coords: start, fScore: startDistance });
  const openPaths = new Set([start]);

  const cameFrom = {};

  const gScore = {};
  gScore[start] = 0;

  const fScore = {};
  fScore[start] = startDistance;

  while (!openSet.empty()) {
    const current = openSet.pop();
    // console.log("-> current", current);

    openPaths.delete(current.coords);

    if (current.coords === end) {
      return reconstructPath(cameFrom, current.coords);
    }

    const { neighbors, neighborStrings } = getNeighbors(grid, current.coords);

    neighbors.forEach((neighbor, i) => {
      let neighborStr = neighborStrings[i];
      // console.log("-> neighborStr", neighborStr);

      if (cameFrom[neighborStr] || neighborStr === start) return;

      gScore[neighborStr] = gScore[neighborStr] ?? Infinity;

      const tentative_gScore = gScore[current.coords] + countDistance(current.coords, neighborStr);
      // console.log("-> gScore[neighborStr]", gScore[neighborStr]);
      // console.log("-> tentative_gScore", tentative_gScore);

      if (tentative_gScore < gScore[neighborStr]) {
        cameFrom[neighborStr] = current.coords;
        gScore[neighborStr] = tentative_gScore;
        // console.log("-> tentative_gScore", tentative_gScore);

        fScore[neighborStr] = tentative_gScore + countDistance(neighborStr, end);

        if (!openPaths.has(neighborStr)) {
          openSet.push({ coords: neighborStr, fScore: fScore[neighborStr] });
          openPaths.add(neighborStr);
        }
      }
    });
  }

  throw "No path to end was found!";
}

function drawPath(grid, path) {
  grid.eachRow((line, x) => {
    let str = "";
    line.forEach((elev, y) => {
      let coords = [x, y].join(",");
      let onPath = path.some(part => part.coords === coords);
      if (onPath) {
        str += chalk.red(elev);
      } else {
        str += elev;
      }
    });
    console.log(str);
  });
  console.log("\n");
}


const start = "0,0";
const end = grid.findIndex((cell) => cell === "E").join(",");

const path = aStarSearch(start, end, grid);
drawPath(grid, path);
console.log("-> partOne", path.length - 1); // remove starting area

// part 2
console.log("-> partTwo");
