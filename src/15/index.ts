import { measurePerformance } from "../utils";
import { partA } from "./partA";
import { partB } from "./partB";

measurePerformance(() => partA()).then((duration) => {
  console.log(`Part A took ${duration} ms`);
});
measurePerformance(() => partB()).then((duration) => {
  console.log(`Part B took ${duration} ms`);
});
