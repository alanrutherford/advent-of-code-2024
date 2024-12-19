import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partB = async (): Promise<void> => {
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
  const MIN_SCORE = 73432;
  let endScore = Number.MAX_SAFE_INTEGER;
  const niceSpots: { x: number; y: number; head: direction }[] = [];
  const move = (
    path: { x: number; y: number; head: direction }[],
    score: number
  ) => {
    const scores: number[] = [];
    if (
      path[path.length - 1].x === end.x &&
      path[path.length - 1].y === end.y
    ) {
      if (score < endScore) {
        endScore = score;
        niceSpots.splice(0, niceSpots.length);
        niceSpots.push(...path);
      }
      if (score === endScore) {
        niceSpots.push(...path);
      }
      return score;
    }
    if (score > MIN_SCORE) {
      //   console.log("went too high, returning ", score);
      return score;
    }
    if (
      visitedPositions[
        `x:${path[path.length - 1].x};y:${path[path.length - 1].y}`
      ] &&
      visitedPositions[
        `x:${path[path.length - 1].x};y:${path[path.length - 1].y}`
      ] <
        score - 1000 // minus 1000 to account for landing on the same spot beofre having to turn
    ) {
      return Number.MAX_SAFE_INTEGER;
    } else {
      visitedPositions[
        `x:${path[path.length - 1].x};y:${path[path.length - 1].y}`
      ] = score;
    }

    // check CW
    const cw = getNextPos({
      x: path[path.length - 1].x,
      y: path[path.length - 1].y,
      head: rotate(path[path.length - 1].head),
    });

    if (input[cw.x][cw.y] !== "#") {
      scores.push(move([...path, cw], score + 1001));
    }

    // check CCW
    const ccw = getNextPos({
      x: path[path.length - 1].x,
      y: path[path.length - 1].y,
      head: rotate(path[path.length - 1].head, true),
    });
    if (input[ccw.x][ccw.y] !== "#") {
      scores.push(move([...path, ccw], score + 1001));
    }
    const straight = getNextPos(path[path.length - 1]);
    if (input[straight.x][straight.y] !== "#") {
      scores.push(move([...path, straight], score + 1));
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
  console.log("This works, just takes a while");
  const score = move([startPos], 0);
  const uni = Array.from(
    new Set(niceSpots.map((spot) => JSON.stringify({ x: spot.x, y: spot.y })))
  ).map((uni) => JSON.parse(uni));

  console.log(`Part B: ${uni.length}`);
};
