import { ppf } from "./gaussian";

const makeA = (N: number) => {
  let a = new Array(N);

  for (let i = 0; i < N; i++) a[i] = ppf(Math.random(), 9.38, 7.35);

  return a.map((score) => {
    if (score < 0) return 0;
    if (score > 19) return 19;
    return score;
  });
};

const sumA = (a: number[], alive?: boolean[]) =>
  a.reduce(
    (prev, curr, i) => (alive ? prev + (alive[i] ? curr : 19) : prev + curr),
    0
  );
const g = (x: number, c: number) =>
  (1 / 10) * Math.pow(1 / 2, (-c * x) / (19 * Math.log10(2)));
const f = (x: number, c: number) =>
  (1 / 10) * Math.pow(1 / 2, (c * (x - 19)) / (19 * Math.log10(2))) +
  Math.random() * 2;
const deathP = (x: number) => (1 / 4) * (x - 15);
const ssScore = ({ T, s }: { T: number; s: number }, N: number) =>
  100 * Math.pow(1 / (1 + T), (20 * (s / N + 1)) / N);

export { g, f, sumA, makeA, deathP, ssScore };
