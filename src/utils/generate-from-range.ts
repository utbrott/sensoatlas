export const generateFromRange = (min: number, max: number, step?: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (step) {
    const possibleNoValues = Math.ceil(max / step);
    return Math.floor(Math.random() * possibleNoValues) * step + min;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};
