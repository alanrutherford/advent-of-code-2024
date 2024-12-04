import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const regEx = /mul\(\d{1,3},\d{1,3}\)/g;
  const input = syncReadFile("./input.txt")
    .match(regEx)
    ?.map((instruction) => {
      const [num1, num2] = instruction
        .split(",")
        .map((num) => parseInt(num.replace(/\D/g, ""), 10));
      return num1 * num2;
    })
    .reduce((a, b) => a + b);

  console.log(`Part A: ${input}`);
}
