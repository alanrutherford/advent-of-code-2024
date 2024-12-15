import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partA = async (): Promise<void> => {
  let input: any[] = (await readFile("./input.txt"))
    .split(" ")
    .map((num) => Number(num));

  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[j] === 0) {
        input[j] = 1;
      } else if (Math.floor(Math.log10(input[j]) + 1) % 2 === 0) {
        let length = Math.floor(Math.log10(input[j]) + 1);
        let divisor = Math.pow(10, length / 2);
        let thing1 = Math.floor(input[j] / divisor);
        let thing2 = input[j] - Math.floor(thing1) * divisor;
        input.splice(j, 1, [thing1, thing2]);
      } else {
        input[j] *= 2024;
      }
    }
    input = input.flat();
  }
  console.log(`Part A: ${input.length}`);
};
