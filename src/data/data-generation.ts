import { round } from 'lodash';

export interface GetRandomMinMax {
  min: number;
  max: number;
}

const getRandomInRange = (
  min: number,
  max: number,
  step?: number,
  withNegative?: boolean
) => {
  min = round(min, 2);
  max = round(max, 2);

  const randomized = step
    ? Math.floor(Math.random() * Math.ceil((max - min) / step)) * step + min
    : Math.floor(Math.random() * (max - min + 1) + min);

  const negativeOrPositive = Math.random() < 0.5 ? -1 : 1;

  return withNegative ? randomized * negativeOrPositive : randomized;
};

export const getRandomSet = (
  size: number,
  gen: { min: number; max: number; step?: number; withNegatives?: boolean },
  limits?: { lower?: number; upper?: number }
) => {
  const set = new Set<number>();

  if (typeof limits?.lower !== ('undefined' || null)) {
    limits.lower = Math.ceil(limits.lower);
    set.add(limits.lower);
  }

  for (let i = set.size; set.size < (limits?.upper ? size - 1 : size); i++) {
    set.add(
      round(getRandomInRange(gen.min, gen.max, gen.step, gen.withNegatives), 2)
    );
  }

  if (typeof limits?.upper !== ('undefined' || null)) {
    limits.upper = Math.floor(limits.upper);
    set.add(limits.upper);
  }

  return [...Array.from(set)];
};
