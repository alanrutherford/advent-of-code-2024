import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  const removeRegex = /don't\(\)(.*?)(do\(\)|$)/g;
  const regEx = /mul\(\d{1,3},\d{1,3}\)/g;
  const input = syncReadFile("./input.txt")
    .replace(/\n/g, "")
    .replace(removeRegex, "")
    .match(regEx)
    ?.map((instruction) => {
      const [num1, num2] = instruction
        .split(",")
        .map((num) => parseInt(num.replace(/\D/g, ""), 10));
      return num1 * num2;
    })
    .reduce((a, b) => a + b);

  console.log(`Part B: ${input}`);
}
