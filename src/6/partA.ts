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
type Cursor = {
  position: Location;
  direction: "N" | "S" | "E" | "W";
};
export default function partA(): void {
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => line.split(""));

  const isInBounds = (location: Location) => {
    return (
      location.x < input.length &&
      location.x >= 0 &&
      location.y < input[location.x].length &&
      location.y >= 0
    );
  };
  const getLocation = (location: Location) => {
    return isInBounds(location) ? input[location.x][location.y] : "+";
  };

  let cursorLocation: Location = { x: 0, y: 0 };
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (getLocation({ x: i, y: j }) === "^") {
        cursorLocation.x = i;
        cursorLocation.y = j;
      }
    }
  }

  let cursor: Cursor = { position: cursorLocation, direction: "N" };

  const facingBlock = () => {
    switch (cursor.direction) {
      case "N":
        return (
          getLocation({
            x: cursor.position.x - 1,
            y: cursor.position.y,
          }) === "#"
        );

      case "S":
        return (
          getLocation({
            x: cursor.position.x + 1,
            y: cursor.position.y,
          }) === "#"
        );

      case "E":
        return (
          getLocation({
            x: cursor.position.x,
            y: cursor.position.y + 1,
          }) === "#"
        );
      case "W":
        return (
          getLocation({
            x: cursor.position.x,
            y: cursor.position.y - 1,
          }) === "#"
        );
    }
  };
  const rotateRight = () => {
    switch (cursor.direction) {
      case "N":
        cursor = { ...cursor, direction: "E" };
        break;
      case "S":
        cursor = { ...cursor, direction: "W" };
        break;
      case "E":
        cursor = { ...cursor, direction: "S" };
        break;
      case "W":
        cursor = { ...cursor, direction: "N" };
        break;
    }
  };

  const stepForward = () => {
    switch (cursor.direction) {
      case "N":
        cursor = {
          ...cursor,
          position: { x: cursor.position.x - 1, y: cursor.position.y },
        };
        break;
      case "S":
        cursor = {
          ...cursor,
          position: { x: cursor.position.x + 1, y: cursor.position.y },
        };
        break;
      case "E":
        cursor = {
          ...cursor,
          position: { x: cursor.position.x, y: cursor.position.y + 1 },
        };
        break;
      case "W":
        cursor = {
          ...cursor,
          position: { x: cursor.position.x, y: cursor.position.y - 1 },
        };
        break;
    }
    return getLocation(cursor.position) !== "+";
  };

  const uniquePositions = new Set<string>();
  while (isInBounds(cursor.position)) {
    // add `x:${x}y:${y} to set for unique positions
    const stringifiedPos = `x:${cursor.position.x}y:${cursor.position.y}`;

    uniquePositions.add(stringifiedPos);
    while (facingBlock()) {
      rotateRight();
    }
    if (!stepForward()) {
      break;
    }
  }
  console.log();

  console.log(`Part A: ${uniquePositions.size}`);
}
