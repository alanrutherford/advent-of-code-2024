import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partB(): void {
  const input = syncReadFile("./input.txt").split("\n");

  let listA: number[] = [];
  let listB: number[] = [];
  for (const line of input) {
    const [inputA, inputB] = line.split(" ").filter((val) => val);

    listA.push(Number(inputA.trim()));
    listB.push(Number(inputB.trim()));
  }
  let occurances: Record<string, number> = {};
  for (let rightItem of listB) {
    if (occurances[`${rightItem}`]) {
      occurances[`${rightItem}`] = occurances[`${rightItem}`] + 1;
    } else {
      occurances[`${rightItem}`] = 1;
    }
  }
  let output: number = 0;

  for (let leftNum of listA) {
    if (occurances[`${leftNum}`] !== undefined) {
      output += leftNum * occurances[`${leftNum}`];
    }
  }
  console.log(`Part B: ${output}`);
}
