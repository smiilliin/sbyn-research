import { sumA, f, g, makeA } from "./functions";

const calc = (N: number, M: number) => {
  let a = makeA(N);
  const c = 1.1;
  const c2 = 0.2;

  let T = 0;
  let minSum = Number.MAX_VALUE;
  let maxSum = Number.MIN_VALUE;

  for (let t = 0; t < M; t++) {
    a = a.map((score) => {
      const newScore = score + g(score, c) - f(score, c2);
      if (newScore < 0) return 0;
      if (newScore > 19) return 19;
      return newScore;
    });

    const currentSum = sumA(a);

    if (minSum > currentSum) {
      minSum = currentSum;
      T = t;
    }
    if (maxSum < currentSum) {
      maxSum = currentSum;
      minSum = maxSum;
    }
  }
  return { T: T, s: 0 };
};

export { calc };
