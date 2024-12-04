import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
type Location = {
  x: number;
  y: number;
};
const getLocation = (input: string[][], location: Location) => {
  return input[location.x][location.y];
};
const checkForXMAS = (input: string[][], xLocation: Location) => {
  let XMASCount = 0;
  //check North

  if (
    xLocation.x >= 3 &&
    getLocation(input, { x: xLocation.x - 1, y: xLocation.y }) === "M" &&
    getLocation(input, { x: xLocation.x - 2, y: xLocation.y }) === "A" &&
    getLocation(input, { x: xLocation.x - 3, y: xLocation.y }) === "S"
  ) {
    XMASCount++;
  }
  //  north East
  if (
    xLocation.x >= 3 &&
    input[xLocation.x].length - xLocation.y > 3 &&
    getLocation(input, { x: xLocation.x - 1, y: xLocation.y + 1 }) === "M" &&
    getLocation(input, { x: xLocation.x - 2, y: xLocation.y + 2 }) === "A" &&
    getLocation(input, { x: xLocation.x - 3, y: xLocation.y + 3 }) === "S"
  ) {
    XMASCount++;
  }
  //Check East
  if (
    input[xLocation.x].length - xLocation.y > 3 &&
    getLocation(input, { x: xLocation.x, y: xLocation.y + 1 }) === "M" &&
    getLocation(input, { x: xLocation.x, y: xLocation.y + 2 }) === "A" &&
    getLocation(input, { x: xLocation.x, y: xLocation.y + 3 }) === "S"
  ) {
    XMASCount++;
  }
  //  south East
  if (
    input.length - xLocation.x > 3 &&
    input[xLocation.x].length - xLocation.y > 3 &&
    getLocation(input, { x: xLocation.x + 1, y: xLocation.y + 1 }) === "M" &&
    getLocation(input, { x: xLocation.x + 2, y: xLocation.y + 2 }) === "A" &&
    getLocation(input, { x: xLocation.x + 3, y: xLocation.y + 3 }) === "S"
  ) {
    XMASCount++;
  }
  //Check South
  if (
    input.length - xLocation.x > 3 &&
    getLocation(input, { x: xLocation.x + 1, y: xLocation.y }) === "M" &&
    getLocation(input, { x: xLocation.x + 2, y: xLocation.y }) === "A" &&
    getLocation(input, { x: xLocation.x + 3, y: xLocation.y }) === "S"
  ) {
    XMASCount++;
  }
  //  south West
  if (
    input.length - xLocation.x > 3 &&
    xLocation.y >= 3 &&
    getLocation(input, { x: xLocation.x + 1, y: xLocation.y - 1 }) === "M" &&
    getLocation(input, { x: xLocation.x + 2, y: xLocation.y - 2 }) === "A" &&
    getLocation(input, { x: xLocation.x + 3, y: xLocation.y - 3 }) === "S"
  ) {
    XMASCount++;
  }
  //Check West
  if (
    xLocation.y >= 3 &&
    getLocation(input, { x: xLocation.x, y: xLocation.y - 1 }) === "M" &&
    getLocation(input, { x: xLocation.x, y: xLocation.y - 2 }) === "A" &&
    getLocation(input, { x: xLocation.x, y: xLocation.y - 3 }) === "S"
  ) {
    XMASCount++;
  }
  //  north West
  if (
    xLocation.x >= 3 &&
    xLocation.y >= 3 &&
    getLocation(input, { x: xLocation.x - 1, y: xLocation.y - 1 }) === "M" &&
    getLocation(input, { x: xLocation.x - 2, y: xLocation.y - 2 }) === "A" &&
    getLocation(input, { x: xLocation.x - 3, y: xLocation.y - 3 }) === "S"
  ) {
    XMASCount++;
  }
  return XMASCount;
};
export default function partA(): void {
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => line.split(""));
  let count = 0;

  /* tests
  let east = [["X", "M", "A", "S"]];
  let south = [["X"], ["M"], ["A"], ["S"]];
  let north = [["S"], ["A"], ["M"], ["X"]];
  let west = [["S", "A", "M", "X"]];
  let northEast = [
    ["", "", "", "S"],
    ["", "", "A", ""],
    ["", "M", "", ""],
    ["X", "", "", ""],
  ];
  let southEast = [
    ["X", "", "", ""],
    ["", "M", "", ""],
    ["", "", "A", ""],
    ["", "", "", "S"],
  ];
  let northWest = [
    ["S", "", "", ""],
    ["", "A", "", ""],
    ["", "", "M", ""],
    ["", "", "", "X"],
  ];
  let southWest = [
    ["", "", "", "X"],
    ["", "", "M", ""],
    ["", "A", "", ""],
    ["S", "", "", ""],
  ];
  console.log(`east: ${checkForXMAS(east, { x: 0, y: 0 })}`);
  console.log(`north: ${checkForXMAS(north, { x: 3, y: 0 })}`);
  console.log(`south: ${checkForXMAS(south, { x: 0, y: 0 })}`);
  console.log(`west: ${checkForXMAS(west, { x: 0, y: 3 })}`);

  console.log(`northEast: ${checkForXMAS(northEast, { x: 3, y: 0 })}`);
  console.log(`southEast: ${checkForXMAS(southEast, { x: 0, y: 0 })}`);
  console.log(`northWest: ${checkForXMAS(northWest, { x: 3, y: 3 })}`);
  console.log(`southWest: ${checkForXMAS(southWest, { x: 0, y: 3 })}`);
  */
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (getLocation(input, { x: i, y: j }) === "X") {
        const sub = checkForXMAS(input, { x: i, y: j });
        if (sub !== 0) {
          count += sub;
        }
      }
    }
  }
  console.log(`Part A: ${count}`);
}
