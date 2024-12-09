import partA from "./partA";
import partB from "./partB";
const partAstart = performance.now();
partA();
const partBstart = performance.now();
partB();
const endPartB = performance.now();
console.log(`Part A: ${(partBstart - partAstart) / 1000}`);
console.log(`Part B: ${(endPartB - partBstart) / 1000}`);
