function erfc(x: number) {
  const z = Math.abs(x);
  const t = 1 / (1 + z / 2);
  // prettier-ignore
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
      t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
          t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
              t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}

function ierfc(x: number) {
  if (x >= 2) {
    return -100;
  }
  if (x <= 0) {
    return 100;
  }
  const xx = x < 1 ? x : 2 - x;
  const t = Math.sqrt(-2 * Math.log(xx / 2));
  // prettier-ignore
  let r = -0.70711 * ((2.30753 + t * 0.27061) /
      (1 + t * (0.99229 + t * 0.04481)) - t);
  for (let j = 0; j < 2; j++) {
    const err = erfc(r) - xx;
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
  }
  return x < 1 ? r : -r;
}

function ppf(x: number, mean: number, standardDeviation: number) {
  return mean - standardDeviation * Math.sqrt(2) * ierfc(2 * x);
}

export { ppf };
