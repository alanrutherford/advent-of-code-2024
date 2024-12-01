import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const input = syncReadFile("./input.txt").split("\n");
  let listA: number[] = [];
  let listB: number[] = [];
  for (const line of input) {
    const [inputA, inputB] = line.split(" ").filter((val) => val);

    listA.push(Number(inputA.trim()));
    listB.push(Number(inputB.trim()));
  }
  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  let differences = 0;
  for (let i = 0; i < listA.length; i++) {
    differences += Math.abs(listA[i] - listB[i]);
  }
  console.log(`Part A: ${differences}`);
}
