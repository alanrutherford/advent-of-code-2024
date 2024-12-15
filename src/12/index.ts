import { measurePerformance } from "../utils";
import { join } from "path";

const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};
const day12 = async () => {
  const input = (await readFile("./input.txt"))
    .split("\n")
    .map((line) => line.split(""));

  const visitedNodes = new Set<string>();

  // please dont tell people I live like this
  const getSides = (group: {
    tile: {
      x: number;
      y: number;
      fences: number;
      left: boolean;
      right: boolean;
      top: boolean;
      bottom: boolean;
    }[];
    label: string;
  }) => {
    //get top, bottom, left, right max values
    if (group.tile.length === 0) {
      return 0;
    }
    if (group.tile.length === 1) {
      return 4;
    }

    let testSpace = new Array(input.length)
      .fill(" ")
      .map((row) => new Array(input[0].length).fill(" "));
    for (let label of group.tile) {
      testSpace[label.x][label.y] = label;
    }
    let leftFences = 0;
    let rightFences = 0;
    let topFences = 0;
    let bottomFences = 0;
    for (const row of testSpace) {
      let topflag = false;
      let bottomFlag = false;
      for (let i = 0; i < row.length; i++) {
        if (!row[i]) {
          topflag = false;
          bottomFlag = false;
        } else {
          if (row[i].top && !topflag) {
            topflag = true;
            topFences++;
          } else if (!row[i].top && topflag) {
            topflag = false;
          }
          if (row[i].bottom && !bottomFlag) {
            bottomFlag = true;
            bottomFences++;
          } else if (!row[i].bottom && bottomFlag) {
            bottomFlag = false;
          }
        }
      }
    }
    for (let j = 0; j < testSpace[0].length; j++) {
      const col = testSpace.map((row) => row[j]);
      let leftflag = false;
      let rightFlag = false;
      for (let i = 0; i < col.length; i++) {
        if (!col[i]) {
          leftflag = false;
          rightFlag = false;
        } else {
          if (col[i].left && !leftflag) {
            leftflag = true;
            leftFences++;
          } else if (!col[i].left && leftflag) {
            leftflag = false;
          }
          if (col[i].right && !rightFlag) {
            rightFlag = true;
            rightFences++;
          } else if (!col[i].right && rightFlag) {
            rightFlag = false;
          }
        }
      }
    }
    return topFences + bottomFences + rightFences + leftFences;
  };

  const move = (position: { x: number; y: number }) => {
    const currentValue = input[position.x][position.y];
    let fences = 0;
    const neighbours = { top: false, bottom: false, left: false, right: false };
    if (visitedNodes.has(`x:${position.x}y:${position.y}`)) {
      return [];
    }
    let retVal: {
      x: number;
      y: number;
      fences: number;
      left: boolean;
      right: boolean;
      top: boolean;
      bottom: boolean;
    }[] = [{ ...position, fences, ...neighbours }];

    visitedNodes.add(`x:${position.x}y:${position.y}`);
    //move up
    if (position.x > 0 && input[position.x - 1][position.y] === currentValue) {
      retVal.push(...move({ x: position.x - 1, y: position.y }));
    } else {
      neighbours.top = true;
      fences++;
    }
    // move down
    if (
      position.x < input.length - 1 &&
      input[position.x + 1][position.y] === currentValue
    ) {
      retVal.push(...move({ x: position.x + 1, y: position.y }));
    } else {
      neighbours.bottom = true;
      fences++;
    }

    //move left
    if (position.y > 0 && input[position.x][position.y - 1] === currentValue) {
      retVal.push(...move({ x: position.x, y: position.y - 1 }));
    } else {
      neighbours.left = true;
      fences++;
    }
    //move right
    if (
      position.y < input[position.x].length - 1 &&
      input[position.x][position.y + 1] === currentValue
    ) {
      retVal.push(...move({ x: position.x, y: position.y + 1 }));
    } else {
      neighbours.right = true;
      fences++;
    }

    retVal[0].fences = fences;
    retVal[0] = { ...retVal[0], ...neighbours };
    return retVal;
  };
  let partA = 0;
  const groups: {
    tile: {
      x: number;
      y: number;
      fences: number;
      left: boolean;
      right: boolean;
      top: boolean;
      bottom: boolean;
    }[];
    label: string;
  }[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const group = move({ x: i, y: j });
      if (group.length > 0) {
        groups.push({ tile: group, label: input[i][j] });
      }
      partA += group.length * group.reduce((a, b) => a + b.fences, 0);
    }
  }
  let partB = 0;
  for (const group of groups) {
    const sides = getSides(group);
    partB += sides * group.tile.length;
  }

  // console.log(groups);
  console.log(`Part A: ${partA}`);
  console.log(`Part B: ${partB}`);
};
measurePerformance(() => day12()).then((duration) => {
  console.log(`Day 12 took ${duration} ms`);
});
