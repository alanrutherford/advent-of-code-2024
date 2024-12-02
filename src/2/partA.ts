import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
const isSafe = (difs: number[]) => {
  const tooBigFilter = difs.filter(
    (val) => Math.abs(val) >= 1 && Math.abs(val) <= 3
  );
  if (tooBigFilter.length != difs.length) {
    return false;
  }
  const areAllNeg = difs.filter((val) => val < 0);

  if (areAllNeg.length === 0 || areAllNeg.length === difs.length) {
    return true;
  }
  return false;
};
export default function partA(): void {
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => line.split(" ").map((val) => Number(val)))
    .map((line) => {
      const difs: number[] = [];
      for (let i = 1; i < line.length; i++) {
        difs.push(Number(line[i] - line[i - 1]));
      }
      return difs;
    })
    .map((difs) => isSafe(difs))
    .filter((line) => line);
  console.log(`Part A: ${input.length}`);
}
