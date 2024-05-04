import { sumA, f, g, makeA, deathP } from "./functions";

const calc = (N: number, M: number) => {
  let a = makeA(N);
  let oldA: number[][] = [makeA(N), makeA(N), makeA(N), makeA(N), makeA(N)];
  const c = 1.1;
  const c2 = 1.5;
  let alive = new Array<boolean>(N).fill(true);

  let T = 0;
  let minSum = Number.MAX_VALUE;
  let maxSum = Number.MIN_VALUE;

  for (let t = 0; t < M; t++) {
    for (let i = 1; i < oldA.length; i++) {
      oldA[i] = oldA[i - 1];
    }
    oldA[0] = a;

    a = oldA[1].map((score, i) => {
      if (!alive[i]) return 0;
      const newScore =
        score +
        (Math.random() < 56 / 100 ? g(score, c) - f(score, c2) : g(score, c));
      if (newScore < 0) return 0;
      if (newScore > 19) return 19;

      if (
        newScore >= 16 &&
        oldA.reduce((prev, curr) => prev && curr[i] >= 16, true)
      ) {
        if (Math.random() < deathP(newScore)) {
          alive[i] = false;
        }
      }
      return newScore;
    });

    const currentSum = sumA(a, alive);

    if (minSum > currentSum) {
      minSum = currentSum;
      T = t;
    }
    if (maxSum < currentSum) {
      maxSum = currentSum;
      minSum = maxSum;
    }
  }
  return { T: T, s: alive.filter((v) => !v).length };
};

export { calc };
