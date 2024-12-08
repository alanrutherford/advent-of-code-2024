import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function partA(): void {
  const evaluate = (calibration: { target: number; numbers: number[] }) => {
    const numOperators = calibration.numbers.length - 1;
    const numberOfOptions = 2 ** numOperators;

    let calibrationGuess = 0;
    for (let i = 0; i <= numberOfOptions - 1; i++) {
      calibrationGuess = calibration.numbers[0];
      let pattern = i.toString(2).padStart(numOperators, "0");

      for (let j = 0; j < pattern.length; j++) {
        if (pattern[j] === "1") {
          calibrationGuess += calibration.numbers[j + 1];
        } else {
          calibrationGuess *= calibration.numbers[j + 1];
        }
      }
      if (calibrationGuess === calibration.target) {
        return true;
      }
    }
    return false;
  };
  const input = syncReadFile("./input.txt")
    .split("\n")
    .map((line) => {
      const [target, numbers] = line.split(": ");
      return {
        target: Number(target),
        numbers: numbers.split(" ").map((num) => Number(num)),
      };
    })
    .filter(evaluate)
    .reduce((a, b) => a + b.target, 0);

  console.log(input);

  console.log(`Part A: `);
}
