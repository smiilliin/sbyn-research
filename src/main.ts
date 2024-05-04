import { calc as calc1 } from "./case1";
import { calc as calc2 } from "./case2";
import { calc as calc3 } from "./case3";
import { calc as calc4 } from "./case4";
import { Gene, GeneticCore } from "@smiilliin/genetic-algorithm";
import { ssScore } from "./functions";

type CalcFunction = (
  N: number,
  M: number
) => {
  T: number;
  s: number;
};

const NValues = [
  5, 25, 50, 75, 100, 250, 500, 625, 750, 875, 1000, 2500, 3750, 5000, 7500,
  10000,
];

const M = 500;
function getScores(calc: CalcFunction) {
  const geneticCore = new GeneticCore(4, 8, 4, 0.06);
  const ssScoreCache = new Map<number, number>();
  const f = (gene: Gene) => {
    const N = NValues[gene.toNumber(4)];
    if (ssScoreCache.has(N)) return 0;
    const score = ssScore(calc(N, M), N);
    ssScoreCache.set(N, score);
    return score;
  };

  for (let i = 0; i < 3; i++) {
    ssScoreCache.clear();

    geneticCore.stepGeneration(f);
  }
  const selectedN = geneticCore.genes.map((v) => NValues[v.toNumber(4)]);

  const result = new Map<number, number>();

  selectedN.forEach((N) => {
    if (ssScoreCache.has(N)) {
      return result.set(N, ssScoreCache.get(N) as number);
    }
    const score = ssScore(calc(N, M), N);
    ssScoreCache.set(N, score);
    result.set(N, score);
  });
  return result;
}
function start(calc: CalcFunction) {
  const T = 3;
  const scores = new Map<number, number>();
  const count = new Map<number, number>();
  for (let i = 0; i < T; i++) {
    getScores(calc).forEach((score, N) => {
      scores.set(N, (scores.get(N) || 0) + score);
      count.set(N, (count.get(N) || 0) + 1);
    });
  }
  scores.forEach((value, key) =>
    scores.set(key, value / (count.get(key) || 1))
  );
  console.log(scores);

  let NMean: number = 0;
  let NV: number = 0; //variance
  const scoreSum = Array.from(scores.values()).reduce(
    (prev, curr) => prev + curr,
    0
  );
  scores.forEach((score, N) => {
    NMean += N * (score / scoreSum);
  });
  scores.forEach((score, N) => {
    NV += N * N * (score / scoreSum);
  });

  NV -= NMean * NMean;

  console.log("Mean", NMean);
  console.log("Standard Deviation", Math.sqrt(NV));
}

console.log("calc1");
start(calc1);

console.log("calc2");
start(calc2);

console.log("calc3");
start(calc3);

console.log("calc4");
start(calc4);
