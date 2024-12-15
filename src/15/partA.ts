import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partA = async (): Promise<void> => {
  const input = (await readFile("./input.txt")).split("\n\n");
  const map = input[0].split("\n").map((line) => line.split(""));
  const directions = input[1].split("");
  let robotPos = { x: 0, y: 0 };
  for (let i = 0; i < map.length; i++) {
    if (map[i].includes("@")) {
      robotPos = { x: i, y: map[i].join("").indexOf("@") };
    }
  }
  const move = (direction: string) => {
    map[robotPos.x][robotPos.y] = ".";
    if (direction === "^") {
      if (map[robotPos.x - 1][robotPos.y] === "#") {
      } else if (map[robotPos.x - 1][robotPos.y] === "O") {
        // push in that direction
        let diff = 1;
        while (true) {
          if (map[robotPos.x - diff][robotPos.y] === "#") {
            break;
          } else if (map[robotPos.x - diff][robotPos.y] === ".") {
            map[robotPos.x - diff][robotPos.y] = "O";
            robotPos.x--;
            break;
          }
          diff++;
        }
      } else robotPos.x--;
    }
    if (direction === "v") {
      if (map[robotPos.x + 1][robotPos.y] === "#") {
      } else if (map[robotPos.x + 1][robotPos.y] === "O") {
        // push in that direction
        let diff = 1;
        while (true) {
          if (map[robotPos.x + diff][robotPos.y] === "#") {
            break;
          } else if (map[robotPos.x + diff][robotPos.y] === ".") {
            map[robotPos.x + diff][robotPos.y] = "O";
            robotPos.x++;
            break;
          }
          diff++;
        }
      } else robotPos.x++;
    }
    if (direction === "<") {
      if (map[robotPos.x][robotPos.y - 1] === "#") {
      } else if (map[robotPos.x][robotPos.y - 1] === "O") {
        // push in that direction
        let diff = 1;
        while (true) {
          if (map[robotPos.x][robotPos.y - diff] === "#") {
            break;
          } else if (map[robotPos.x][robotPos.y - diff] === ".") {
            map[robotPos.x][robotPos.y - diff] = "O";
            robotPos.y--;
            break;
          }
          diff++;
        }
      } else robotPos.y--;
    }
    if (direction === ">") {
      if (map[robotPos.x][robotPos.y + 1] === "#") {
      } else if (map[robotPos.x][robotPos.y + 1] === "O") {
        // push in that direction
        let diff = 1;
        while (true) {
          if (map[robotPos.x][robotPos.y + diff] === "#") {
            break;
          } else if (map[robotPos.x][robotPos.y + diff] === ".") {
            map[robotPos.x][robotPos.y + diff] = "O";
            robotPos.y++;
            break;
          }
          diff++;
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
      if (map[i][j] === "O") {
        score += 100 * i + j;
      }
    }
  }

  console.log(`Part A: ${score}`);
};
