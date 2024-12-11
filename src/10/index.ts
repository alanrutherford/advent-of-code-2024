import { measurePerformance } from "../utils";

import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const day10 = async () => {
  {
    const input = (await readFile("./input.txt"))
      .split("\n")
      .map((line) => line.split("").map((num) => Number(num)));
    const move = (position: { x: number; y: number }) => {
      //move up
      const currentValue = input[position.x][position.y];
      let retVal: { x: number; y: number }[] = [];
      if (currentValue === 9) {
        return [position];
      }
      if (
        position.x > 0 &&
        input[position.x - 1][position.y] === currentValue + 1
      ) {
        retVal.push(...move({ x: position.x - 1, y: position.y }));
      }
      // move down
      if (
        position.x < input.length - 1 &&
        input[position.x + 1][position.y] === currentValue + 1
      ) {
        retVal.push(...move({ x: position.x + 1, y: position.y }));
      }

      //move left
      if (
        position.y > 0 &&
        input[position.x][position.y - 1] === currentValue + 1
      ) {
        retVal.push(...move({ x: position.x, y: position.y - 1 }));
      }
      //move right
      if (
        position.y < input[position.x].length - 1 &&
        input[position.x][position.y + 1] === currentValue + 1
      ) {
        retVal.push(...move({ x: position.x, y: position.y + 1 }));
      }
      return retVal;
    };
    const startingNodes: { x: number; y: number }[] = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === 0) {
          startingNodes.push({ x: i, y: j });
        }
      }
    }
    let heads = 0;
    let rating = 0;
    for (const startingNode of startingNodes) {
      //start traversing
      const score = move(startingNode);
      heads += new Set(score.map((end) => `x:${end.x},y:${end.y}`)).size;
      rating += score.length;
    }
    // await delay(20);
    console.log(`Part A: ${heads}`);
    console.log(`Part B: ${rating}`);
    await delay(100);
    return;
  }
};
measurePerformance(() => day10()).then((duration) => {
  console.log(`day 10 took ${duration} ms`);
});
