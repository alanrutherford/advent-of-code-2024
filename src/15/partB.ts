import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partB = async (): Promise<void> => {
  const input = (await readFile("./input.txt")).split("\n\n");
  const map = input[0].split("\n").map((line) =>
    line
      .split("")
      .map((val) => {
        if (val === "O") {
          return ["[", "]"];
        } else if (val === "#") {
          return ["#", "#"];
        } else if (val === ".") {
          return [".", "."];
        } else if (val === "@") {
          return ["@", "."];
        }
      })
      .flat()
  );

  const directions = input[1].split("\n").join("").split("");
  let robotPos = { x: 0, y: 0 };
  for (let i = 0; i < map.length; i++) {
    if (map[i].includes("@")) {
      robotPos = { x: i, y: map[i].join("").indexOf("@") };
    }
  }
  const affectedBlocks: { x: number; y: number }[] = [];
  const checkForBlocks = (
    leftPosition: { x: number; y: number },
    direction: { x: number; y: number }
  ) => {
    let canMove: boolean[] = [];

    if (
      map[leftPosition.x + direction.x][leftPosition.y] === "#" ||
      map[leftPosition.x + direction.x][leftPosition.y + 1] === "#"
    ) {
      affectedBlocks.splice(0, affectedBlocks.length);
      return false;
    }
    // left to left
    else if (map[leftPosition.x + direction.x][leftPosition.y] === "[") {
      //set block as affected
      affectedBlocks.push({
        x: leftPosition.x + direction.x,
        y: leftPosition.y,
      });
      canMove.push(
        checkForBlocks(
          {
            x: leftPosition.x + direction.x,
            y: leftPosition.y,
          },
          direction
        )
      );
    }
    // left to right
    else if (map[leftPosition.x + direction.x][leftPosition.y] === "]") {
      //set block as affected
      affectedBlocks.push({
        x: leftPosition.x + direction.x,
        y: leftPosition.y - 1,
      });
      canMove.push(
        checkForBlocks(
          {
            x: leftPosition.x + direction.x,
            y: leftPosition.y - 1,
          },
          direction
        )
      );
    }
    // right to left
    if (map[leftPosition.x + direction.x][leftPosition.y + 1] === "[") {
      //set block as affected
      affectedBlocks.push({
        x: leftPosition.x + direction.x,
        y: leftPosition.y + 1,
      });
      canMove.push(
        checkForBlocks(
          {
            x: leftPosition.x + direction.x,
            y: leftPosition.y + 1,
          },
          direction
        )
      );
    }
    return canMove.every((val) => val === true);
  };
  const moveAffectedBlocks = (direction: { x: number; y: number }) => {
    affectedBlocks.forEach((block) => {
      map[block.x][block.y] = ".";
      map[block.x][block.y + 1] = ".";
    });
    affectedBlocks.forEach((block) => {
      map[block.x + direction.x][block.y] = "[";
      map[block.x + direction.x][block.y + 1] = "]";
    });
    affectedBlocks.splice(0, affectedBlocks.length);
  };
  const move = (direction: string) => {
    map[robotPos.x][robotPos.y] = ".";
    if (direction === "v") {
      if (map[robotPos.x + 1][robotPos.y] === "#") {
        // dont move
      } else if (map[robotPos.x + 1][robotPos.y] === ".") {
        // move
        robotPos.x++;
        map[robotPos.x][robotPos.y] = "@";
        return;
      } else if (map[robotPos.x + 1][robotPos.y] === "[") {
        affectedBlocks.push({
          x: robotPos.x + 1,
          y: robotPos.y,
        });
        if (
          checkForBlocks(
            {
              x: robotPos.x + 1,
              y: robotPos.y,
            },
            { x: 1, y: 0 }
          )
        ) {
          moveAffectedBlocks({ x: 1, y: 0 });
          robotPos.x++;
        } else {
          // clear array
          affectedBlocks.splice(0, affectedBlocks.length);
          // console.log("cant push");
        }
        map[robotPos.x][robotPos.y] = "@";
        return;
      } else if (map[robotPos.x + 1][robotPos.y] === "]") {
        // push in that direction
        affectedBlocks.push({
          x: robotPos.x + 1,
          y: robotPos.y - 1,
        });
        if (
          checkForBlocks(
            {
              x: robotPos.x + 1,
              y: robotPos.y - 1,
            },
            { x: 1, y: 0 }
          )
        ) {
          moveAffectedBlocks({ x: 1, y: 0 });
          robotPos.x++;
        }
        affectedBlocks.splice(0, affectedBlocks.length);

        map[robotPos.x][robotPos.y] = "@";
        return;
      }
    }
    if (direction === "^") {
      if (map[robotPos.x - 1][robotPos.y] === "#") {
        // dont move
      } else if (map[robotPos.x - 1][robotPos.y] === ".") {
        robotPos.x--;
        map[robotPos.x][robotPos.y] = "@";
        return;
      } else if (map[robotPos.x - 1][robotPos.y] === "[") {
        affectedBlocks.push({
          x: robotPos.x - 1,
          y: robotPos.y,
        });

        if (
          checkForBlocks(
            {
              x: robotPos.x - 1,
              y: robotPos.y,
            },
            { x: -1, y: 0 }
          )
        ) {
          moveAffectedBlocks({ x: -1, y: 0 });
          robotPos.x--;
        } else {
          affectedBlocks.splice(0, affectedBlocks.length);
        }
        map[robotPos.x][robotPos.y] = "@";
        return;
      } else if (map[robotPos.x - 1][robotPos.y] === "]") {
        affectedBlocks.push({
          x: robotPos.x - 1,
          y: robotPos.y - 1,
        });
        if (
          checkForBlocks(
            {
              x: robotPos.x - 1,
              y: robotPos.y - 1,
            },
            { x: -1, y: 0 }
          )
        ) {
          moveAffectedBlocks({ x: -1, y: 0 });
          robotPos.x--;
        }
        affectedBlocks.splice(0, affectedBlocks.length);
        map[robotPos.x][robotPos.y] = "@";
        return;
      }
    }
    if (direction === "<") {
      if (map[robotPos.x][robotPos.y - 1] === "#") {
      } else if (map[robotPos.x][robotPos.y - 1] === "]") {
        let diff = 1;
        while (true) {
          if (map[robotPos.x][robotPos.y - diff] === "#") {
            break;
          } else if (map[robotPos.x][robotPos.y - diff] === ".") {
            for (let i = robotPos.y - diff; i < robotPos.y - 1; i += 2) {
              // console.log(i);
              map[robotPos.x][i] = "[";
              map[robotPos.x][i + 1] = "]";
            }
            robotPos.y--;
            break;
          } else {
            diff += 1;
          }
        }
      } else robotPos.y--;
    }
    if (direction === ">") {
      if (map[robotPos.x][robotPos.y + 1] === "#") {
      } else if (map[robotPos.x][robotPos.y + 1] === "[") {
        let diff = 1;
        while (true) {
          if (map[robotPos.x][robotPos.y + diff] === "#") {
            break;
          } else if (map[robotPos.x][robotPos.y + diff] === ".") {
            for (let i = robotPos.y + diff; i > robotPos.y + 1; i -= 2) {
              map[robotPos.x][i] = "]";
              map[robotPos.x][i - 1] = "[";
            }
            robotPos.y++;
            break;
          } else {
            diff += 1;
          }
        }
      } else robotPos.y++;
    }
    map[robotPos.x][robotPos.y] = "@";
  };

  for (const direction of directions) {
    move(direction);
  }
  let score = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "[") {
        score += 100 * i + j;
      }
    }
  }
  console.log(`Part B: ${score}`);
};
