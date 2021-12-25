export const roundToDecimal = (value: number) => {
  const noFloating = Number((Math.abs(value) * 100).toPrecision(15));
  return Math.round(noFloating) / 100 + Math.sign(value);
};
