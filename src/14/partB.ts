import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partB = async (): Promise<void> => {
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

  let seconds = 0;
  let noChristmasTree = true;
  while (noChristmasTree) {
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
    for (const line of floor) {
      if (line.join("").includes("1111111")) {
        noChristmasTree = false;
      }
    }
    seconds++;
  }
  for (const line of floor) {
    console.log(line.join(""));
  }

  console.log(`Part B: ${seconds}`);
};
