import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  interface AntennaGroup {
    [key: string]: { x: number; y: number }[];
  }
  let antennas: AntennaGroup = {};
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => line.split(""));
  const isInBounds = (location: { x: number; y: number }) => {
    return (
      location.x < input.length &&
      location.x >= 0 &&
      location.y < input[location.x].length &&
      location.y >= 0
    );
  };
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] !== ".") {
        if (!antennas[input[i][j]]) {
          antennas[input[i][j]] = [];
        }
        antennas[input[i][j]] = [...antennas[input[i][j]], { x: i, y: j }];
      }
    }
  }

  const antinodes = new Set<string>();

  for (let antenna in antennas) {
    for (let i = 0; i < antennas[antenna].length - 1; i++) {
      for (let j = i + 1; j < antennas[antenna].length; j++) {
        let posDifferences = {
          x: antennas[antenna][i].x - antennas[antenna][j].x,
          y: antennas[antenna][i].y - antennas[antenna][j].y,
        };
        let antiNode1 = {
          x: antennas[antenna][i].x + posDifferences.x,
          y: antennas[antenna][i].y + posDifferences.y,
        };
        let antiNode2 = {
          x: antennas[antenna][j].x - posDifferences.x,
          y: antennas[antenna][j].y - posDifferences.y,
        };
        if (isInBounds(antiNode1)) {
          antinodes.add(`x${antiNode1.x}y${antiNode1.y}`);
        }
        if (isInBounds(antiNode2)) {
          antinodes.add(`x${antiNode2.x}y${antiNode2.y}`);
        }
      }
    }
  }
  console.log(`Part A: ${antinodes.size}`);
}
