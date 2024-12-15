import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partB = async (): Promise<void> => {
  const input = (await readFile("./input.txt")).split("\n\n").map((machine) => {
    const lines = machine
      .split("\n")
      .map((line) => line.split(":").pop()?.trim())
      .map((part) => part?.split(",").map((eq) => eq.trim()));
    const buttonA = lines[0]?.map((eq) => Number(eq.split("+").pop())) ?? 0;
    const buttonB = lines[1]?.map((eq) => Number(eq.split("+").pop())) ?? 0;
    const prize = lines[2]?.map((eq) => Number(eq.split("=").pop())) ?? 0;

    return {
      buttonA: { x: buttonA[0] ?? 0, y: buttonA[1] },
      buttonB: { x: buttonB[0] ?? 0, y: buttonB[1] },
      prize: {
        x: prize[0] + 10000000000000,
        y: prize[1] + 10000000000000,
      },
    };
  });
  let tokens = 0;
  for (let machine of input) {
    let one = machine.buttonA.y * machine.prize.x;
    let two = machine.buttonA.x * machine.prize.y;
    let three = machine.buttonB.x * machine.buttonA.y;
    let four = machine.buttonA.x * machine.buttonB.y;
    // trust me bro
    let buttonB = (one - two) / (three - four);
    let buttonA =
      (machine.prize.x - buttonB * machine.buttonB.x) / machine.buttonA.x;
    if (Number.isInteger(buttonA) && Number.isInteger(buttonB)) {
      tokens += 3 * buttonA + buttonB;
    }
  }

  console.log(`Part B: ${tokens}`);
};
