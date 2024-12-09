import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};
export const partA = async (): Promise<void> => {
  const output: any[] = [];
  const input = (await readFile("./input.txt"))
    .split("")
    .map((num) => Number(num));

  let index = 0;
  for (let i = 0; i < input.length; i++) {
    if (i % 2 == 0) {
      output.push(...new Array(input[i]).fill(index));
      index++;
    } else {
      output.push(...new Array(input[i]).fill("."));
    }
  }
  for (let i = 0; i < output.length; i++) {
    if (output[i] === ".") {
      //pop the last value off the end and add it in here
      let last;
      do {
        last = output.pop();
      } while (last === ".");
      // console.log(last);
      output[i] = last;
    }
  }

  const checksum = output
    .filter((num) => Number.isInteger(num))
    .map((num, i) => Number(num) * i)
    .reduce((a, b) => a + b);

  // console.log(output.join(""));
  console.log(`Part A: ${checksum}`);
};
