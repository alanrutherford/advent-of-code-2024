import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partA = async (): Promise<void> => {
  const HEIGHT = 103;
  const WIDTH = 101;
  const robots: {
    position: {
      x: number;
      y: number;
    };
    velocity: {
      x: number;
      y: number;
    };
  }[] = (await readFile("./input.txt"))
    .split("\n")
    .map((line) =>
      line.split(" ").map((vals) =>
        vals
          .split("=")
          .pop()
          ?.split(",")
          .map((num) => Number(num))
      )
    )
    .map((nums) => {
      if (nums[0] && nums[1]) {
        return {
          position: {
            x: nums[0][1] ?? 0,
            y: nums[0][0] ?? 0,
          },
          velocity: {
            x: nums[1][1] ?? 0,
            y: nums[1][0] ?? 0,
          },
        };
      }
    })
    .filter((robot) => !!robot);
  let floor = new Array(HEIGHT).fill(0).map((row) => new Array(WIDTH).fill(0));
  // initial positions
  for (const robot of robots) {
    floor[robot.position.x][robot.position.y] += 1;
  }
  for (let seconds = 0; seconds < 100; seconds++) {
    for (const robot of robots) {
      floor[robot.position.x][robot.position.y] -= 1;
      robot.position.x += robot.velocity.x;
      robot.position.y += robot.velocity.y;
      if (robot.position.x >= HEIGHT) {
        robot.position.x -= HEIGHT;
      }
      if (robot.position.x < 0) {
        robot.position.x += HEIGHT;
      }
      if (robot.position.y >= WIDTH) {
        robot.position.y -= WIDTH;
      }
      if (robot.position.y < 0) {
        robot.position.y += WIDTH;
      }
      floor[robot.position.x][robot.position.y] += 1;
    }
  }
  let quadrant1 = 0;
  let quadrant2 = 0;
  let quadrant3 = 0;
  let quadrant4 = 0;
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j] > 0) {
        if (i < HEIGHT / 2 - 1 && j < WIDTH / 2 - 1) {
          //quadrant1
          quadrant1 += floor[i][j];
        }
        if (i < HEIGHT / 2 - 1 && j > WIDTH / 2) {
          //quadrant2
          quadrant2 += floor[i][j];
        }
        if (i > HEIGHT / 2 && j < WIDTH / 2 - 1) {
          //quadrant3
          quadrant3 += floor[i][j];
        }
        if (i > HEIGHT / 2 && j > WIDTH / 2) {
          //quadrant4
          quadrant4 += floor[i][j];
        }
      }
    }
  }
  console.log(`Part A: ${quadrant1 * quadrant2 * quadrant3 * quadrant4}`);
};
