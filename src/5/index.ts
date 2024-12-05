import { readFileSync } from "fs";
import { join } from "path";
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export default function run(): void {
  interface Rule {
    [key: number]: number[];
  }
  let rules: Rule = {};
  let reOrdered = 0;
  let updates = 0;
  const checkIfInOrder = (updateToCheck: number[]) => {
    for (const page of updateToCheck) {
      const rule = rules[page];
      if (
        rule &&
        !rule.every(
          (num) => updateToCheck.indexOf(num) < updateToCheck.indexOf(page)
        )
      ) {
        return false;
      }
    }
    // console.log("in order");
    return true;
  };
  const reorderUpdate = (updateToReorder: number[]) => {
    let j = 0;
    while (!checkIfInOrder(updateToReorder)) {
      const ruleList = rules[updateToReorder[j]];
      if (ruleList) {
        for (const rule of ruleList) {
          if (
            updateToReorder.indexOf(rule) >
            updateToReorder.indexOf(updateToReorder[j])
          ) {
            //we need to do some swapping
            updateToReorder.splice(updateToReorder.indexOf(rule), 1);
            updateToReorder.splice(
              updateToReorder.indexOf(updateToReorder[j]),
              0,
              rule
            );
            j = -1;
            // console.log("restarting loop");
            break;
          }
        }
      }
      j++;
    }
    return updateToReorder[Math.floor(updateToReorder.length / 2)];
  };
  const [rawRules, pages] = syncReadFile("./input.txt").split("\n\n");

  rawRules.split("\n").map((rule) => {
    const [x, y] = rule.split("|");
    if (rules[Number(y)]) {
      rules[Number(y)].push(Number(x));
    } else {
      rules[Number(y)] = [Number(x)];
    }
  });

  pages
    .split("\n")
    .map((line) => line.split(",").map((num) => Number(num)))
    .map((update) => {
      if (checkIfInOrder(update)) {
        updates += update[Math.floor(update.length / 2)];
      } else {
        reOrdered += reorderUpdate(update);
      }
    });

  console.log(`Part A: ${updates}`);
  console.log(`Part B: ${reOrdered}`);
}
run();
