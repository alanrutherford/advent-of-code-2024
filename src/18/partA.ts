import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partA = async (): Promise<void> => {
  const HEIGHT = 71;
  const WIDTH = 71;
  const numberOfBytes = 1024;
  const start = { x: 0, y: 0, f: 0, g: 0, h: 0 };
  const end = { x: HEIGHT, y: WIDTH };
  const input = (await readFile("./input.txt")).split("\n").map((line) => {
    const [x, y] = line.split(",").map((num) => Number(num));
    return { x, y };
  });
  const map = new Array(HEIGHT)
    .fill(".")
    .map((row) => new Array(WIDTH).fill("."));
  type node = { x: number; y: number; f: number; h: number; g: number };
  for (let i = 0; i < numberOfBytes; i++) {
    map[input[i].y][input[i].x] = "#";
  }
  let visitedPositions: Record<string, number> = {};

  const astar = () => {
    const openList: node[] = [];

    openList.push({
      x: start.x,
      y: start.y,
      g: 0,
      h: 0,
      f: 0,
    });
    while (openList.length > 0) {
      let currentNode = openList.shift();
      if (!currentNode) {
        continue;
      }

      if (currentNode.x === end.x - 1 && currentNode.y === end.y - 1) {
        return currentNode.g;
      }

      if (
        visitedPositions[`x:${currentNode.x};y:${currentNode.y}`] &&
        visitedPositions[`x:${currentNode.x};y:${currentNode.y}`] <=
          currentNode.g
      ) {
        continue;
      } else {
        visitedPositions[`x:${currentNode.x};y:${currentNode.y}`] =
          currentNode.g;
      }
      const children: node[] = [];
      // move up: y--
      if (currentNode.y > 0 && map[currentNode.y - 1][currentNode.x] !== "#") {
        const h =
          (currentNode.y - 1 - end.y) ** 2 + (currentNode.x - end.x) ** 2;
        children.push({
          x: currentNode.x,
          y: currentNode.y - 1,
          g: currentNode.g + 1,
          h,
          f: currentNode.g + 1 + h,
        });
      }

      // move down y++
      if (
        currentNode.y < map.length - 1 &&
        map[currentNode.y + 1][currentNode.x] !== "#"
      ) {
        const h =
          (currentNode.y + 1 - end.y) ** 2 + (currentNode.x - end.x) ** 2;
        children.push({
          x: currentNode.x,
          y: currentNode.y + 1,
          g: currentNode.g + 1,
          h,
          f: currentNode.g + 1 + h,
        });
      }

      //move left x-
      if (currentNode.x > 0 && map[currentNode.y][currentNode.x - 1] !== "#") {
        const h =
          (currentNode.y - end.y) ** 2 + (currentNode.x - 1 - end.x) ** 2;
        children.push({
          x: currentNode.x - 1,
          y: currentNode.y,
          g: currentNode.g + 1,
          h,
          f: currentNode.g + 1 + h,
        });
      }

      //move right x++
      if (
        currentNode.x < map[currentNode.y].length - 1 &&
        map[currentNode.y][currentNode.x + 1] !== "#"
      ) {
        const h =
          (currentNode.y - end.y) ** 2 + (currentNode.x + 1 - end.x) ** 2;
        children.push({
          x: currentNode.x + 1,
          y: currentNode.y,
          g: currentNode.g + 1,
          h,
          f: currentNode.g + 1 + h,
        });
      }
      openList.push(...children);
    }
  };

  const steps = astar();
  console.log(`Part A: ${steps}`);
};
