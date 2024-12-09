import { join } from "path";
const readFile = async (filename: string) => {
  return Bun.file(join(__dirname, filename)).text();
};
const chunkify = (stringToChunk: any[]) => {
  let chunks: any[] = [];
  for (let i = 0; i < stringToChunk.length; ) {
    let count = 0;
    while (stringToChunk[i] === stringToChunk[i + count]) {
      count++;
    }
    chunks.push(new Array(count).fill(stringToChunk[i]));
    i += count;
  }
  return chunks;
};
export const partB = async (): Promise<void> => {
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
  let chunks: string[][] = chunkify(output);

  let fileIdIndex = 0;

  for (let j = chunks.length - 1; j >= 0; j--) {
    if (!chunks[j].includes(".")) {
      fileIdIndex = Number(chunks[j][0]) + 1;
      break;
    }
  }

  for (let j = chunks.length - 1; j >= 0; j--) {
    if (!chunks[j].includes(".") && Number(chunks[j][0]) < fileIdIndex) {
      for (let i = 0; i < chunks.length && i < j; i++) {
        if (chunks[i][0] === "." && chunks[i].length >= chunks[j].length) {
          const replacement = chunks[j];
          fileIdIndex = Number(chunks[j][0]);
          chunks[j] = new Array(chunks[j].length).fill(".");
          // merge blank chunks if the new blank chunk is next to some blanks
          if (j < chunks.length - 1 && chunks[j + 1][0] === ".") {
            chunks[j] = [...chunks[j], ...chunks[j + 1]];
            chunks.splice(j + 1, 1);
          }
          if (chunks[j - 1][0] === ".") {
            chunks[j] = [...chunks[j], ...chunks[j - 1]];
            chunks.splice(j - 1, 1);
          }

          if (chunks[i].length - replacement.length > 0) {
            chunks.splice(
              i,
              1,
              replacement,
              new Array(chunks[i].length - replacement.length).fill(".")
            );
          } else {
            chunks.splice(i, 1, replacement);
          }
          // start at the end again, probably some more efficient way than this
          j = chunks.length - 1;
          break;
        }
      }
    }
  }

  const checksum = chunks
    .flat()
    .map((num, i) => (Number.isInteger(Number(num)) ? Number(num) * i : 0))
    .reduce((a, b) => a + b);

  console.log(`Part B: ${checksum}`);
};
