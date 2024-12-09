export const measurePerformance = (fn: () => Promise<any>): Promise<number> => {
  let onPromiseDone = () => performance.now() - start;

  let start = performance.now();
  return fn().then(onPromiseDone);
};
