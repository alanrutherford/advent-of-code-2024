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

const checkForCrossMAS = (input: string[][], aLocation: Location) => {
  if (
    aLocation.x >= 1 &&
    aLocation.y >= 1 &&
    input[aLocation.x].length - aLocation.y > 1 &&
    input.length - aLocation.x > 1
  ) {
    //north
    if (
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y - 1 }) == "M" &&
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y + 1 }) == "M" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y - 1 }) == "S" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y + 1 }) == "S"
    ) {
      return 1;
    }
    //south
    if (
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y - 1 }) == "M" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y + 1 }) == "M" &&
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y - 1 }) == "S" &&
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y + 1 }) == "S"
    ) {
      return 1;
    }
    //east
    if (
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y + 1 }) == "M" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y + 1 }) == "M" &&
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y - 1 }) == "S" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y - 1 }) == "S"
    ) {
      return 1;
    }
    //west
    if (
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y - 1 }) == "M" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y - 1 }) == "M" &&
      getLocation(input, { x: aLocation.x - 1, y: aLocation.y + 1 }) == "S" &&
      getLocation(input, { x: aLocation.x + 1, y: aLocation.y + 1 }) == "S"
    ) {
      return 1;
    }
  }
  return 0;
};

export default function partB(): void {
  let count = 0;

  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => line.split(""));
  /* tests
  let north = [
    ["M", "", "M"],
    ["", "A", ""],
    ["S", "", "S"],
  ];
  let south = [
    ["S", "", "S"],
    ["", "A", ""],
    ["M", "", "M"],
  ];
  let east = [
    ["S", "", "M"],
    ["", "A", ""],
    ["S", "", "M"],
  ];
  let west = [
    ["M", "", "S"],
    ["", "A", ""],
    ["M", "", "S"],
  ];
  console.log(`east: ${checkForCrossMAS(east, { x: 1, y: 1 })}`);
  console.log(`north: ${checkForCrossMAS(north, { x: 1, y: 1 })}`);
  console.log(`south: ${checkForCrossMAS(south, { x: 1, y: 1 })}`);
  console.log(`west: ${checkForCrossMAS(west, { x: 1, y: 1 })}`);
   */
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (getLocation(input, { x: i, y: j }) === "A") {
        const sub = checkForCrossMAS(input, { x: i, y: j });
        if (sub !== 0) {
          count += sub;
        }
      }
    }
  }

  console.log(`Part B: ${count}`);
}
