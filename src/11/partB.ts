import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partB = async (): Promise<void> => {
  let input: any[] = (await readFile("./input.txt"))
    .split(" ")
    .map((num) => Number(num));
  let stones2: Record<number, number> = {};
  for (let i = 0; i < input.length; i++) {
    stones2[input[i]] = 1;
  }

  for (let i = 0; i < 75; i++) {
    let stones: Record<number, number> = stones2;
    let newStones: Record<number, number> = {};
    for (let stoneType in stones) {
      let ans: number[];
      let stoney = Number(stoneType);
      if (stoney === 0) {
        ans = [1];
      } else if (Math.floor(Math.log10(stoney) + 1) % 2 === 0) {
        let length = Math.floor(Math.log10(stoney) + 1);
        let divisor = Math.pow(10, length / 2);
        let thing1 = Math.floor(stoney / divisor);
        let thing2 = stoney - Math.floor(thing1) * divisor;
        ans = [thing1, thing2];
      } else {
        ans = [stoney * 2024];
      }
      ans.forEach((stone) => {
        if (newStones[stone]) {
          newStones[stone] += stones[stoney];
        } else {
          newStones[stone] = stones[stoney];
        }
      });
    }
    stones2 = newStones;
  }
  let ans = 0;
  for (let stoneType in stones2) {
    ans += stones2[Number(stoneType)];
  }

  console.log(`Part B: ${ans}`);
};
