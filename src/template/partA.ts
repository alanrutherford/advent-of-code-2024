import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};

export const partA = async (): Promise<void> => {
  const input = await readFile("./input.txt");

  console.log(`Part A:`);
};
