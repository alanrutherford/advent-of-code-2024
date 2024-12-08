import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}
function numDigits(x: number) {
  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}
export default function partB(): void {
  const evaluateTrinary = (calibration: {
    target: number;
    numbers: number[];
  }) => {
    const numOperators = calibration.numbers.length - 1;
    const numberOfOptions = 3 ** numOperators;

    let calibrationGuess = 0;
    for (let i = 0; i <= numberOfOptions - 1; i++) {
      calibrationGuess = calibration.numbers[0];
      let pattern = i.toString(3).padStart(numOperators, "0");

      for (let j = 0; j < pattern.length; j++) {
        if (pattern[j] === "0") {
          calibrationGuess += calibration.numbers[j + 1];
        } else if (pattern[j] === "1") {
          calibrationGuess *= calibration.numbers[j + 1];
        } else {
          calibrationGuess =
            calibrationGuess * 10 ** numDigits(calibration.numbers[j + 1]) +
            calibration.numbers[j + 1];
        }
        if (calibrationGuess > calibration.target) {
          break;
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
    .filter(evaluateTrinary)
    .reduce((a, b) => a + b.target, 0);

  console.log(`Part B: ${input} => ${input === 426214131924213}`);
}
