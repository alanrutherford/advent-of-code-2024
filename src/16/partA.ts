import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partA = async (): Promise<void> => {
  const input = (await readFile("./input.txt"))
    .split("\n")
    .map((line) => line.split(""));
  type direction = "N" | "S" | "E" | "W";
  let end = {
    x: 0,
    y: 0,
  };
  let startPos: { x: number; y: number; head: direction } = {
    x: 0,
    y: 0,
    head: "E",
  };
  const rotate = (heading: direction, ccw = false) => {
    switch (heading) {
      case "N":
        return ccw ? "W" : "E";
      case "E":
        return ccw ? "N" : "S";
      case "S":
        return ccw ? "E" : "W";
      case "W":
        return ccw ? "S" : "N";
    }
  };
  const getNextPos = (position: { x: number; y: number; head: direction }) => {
    switch (position.head) {
      case "N":
        return { y: position.y, x: position.x - 1, head: position.head };
      case "E":
        return { x: position.x, y: position.y + 1, head: position.head };
      case "S":
        return { y: position.y, x: position.x + 1, head: position.head };
      case "W":
        return { x: position.x, y: position.y - 1, head: position.head };
    }
  };
  let visitedPositions: Record<string, number> = {};
  const move = (
    position: { x: number; y: number; head: direction },
    score: number
  ) => {
    const scores: number[] = [];
    if (position.x === end.x && position.y === end.y) {
      return score;
    }

    if (
      visitedPositions[`x:${position.x};y:${position.y}`] &&
      visitedPositions[`x:${position.x};y:${position.y}`] < score
    ) {
      return Number.MAX_SAFE_INTEGER;
    } else {
      visitedPositions[`x:${position.x};y:${position.y}`] = score;
    }

    const straight = getNextPos(position);
    if (input[straight.x][straight.y] !== "#") {
      scores.push(move(straight, score + 1));
    }
    // check CW
    const cw = getNextPos({
      x: position.x,
      y: position.y,
      head: rotate(position.head),
    });

    if (input[cw.x][cw.y] !== "#") {
      scores.push(move(cw, score + 1001));
    }

    // check CCW
    const ccw = getNextPos({
      x: position.x,
      y: position.y,
      head: rotate(position.head, true),
    });
    if (input[ccw.x][ccw.y] !== "#") {
      scores.push(move(ccw, score + 1001));
    }

    return scores.sort((a, b) => a - b)[0];
  };

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "S") {
        startPos = { x: i, y: j, head: "E" };
      } else if (input[i][j] === "E") {
        end = { x: i, y: j };
      }
    }
  }
  const score = move(startPos, 0);
  console.log(`Part A: ${score}`);
};
