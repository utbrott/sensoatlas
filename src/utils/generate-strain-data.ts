import { generateFromRange } from './generate-from-range';

const calculateStrain = (modulus: number, area: number, mass: number) => {
  let value = ((mass * 9.81) / (area * modulus)) * Math.pow(10, 6);
  return parseFloat(value.toFixed(2));
};

export const generateStrainValues = (context: any) => {
  const MODULUS = parseInt(context.strain.config.modulus) * Math.pow(10, 9);
  const AREA = 0.05 * 0.005;
  const MIN_STRAIN = calculateStrain(MODULUS, AREA, 0.5);
  const MAX_STRAIN = calculateStrain(MODULUS, AREA, 10);

  const set = new Set<number>();
  for (let i = set.size; set.size < 5; ++i) {
    let value = parseFloat(
      generateFromRange(MIN_STRAIN, MAX_STRAIN, 0.1).toFixed(2)
    );
    set.add(value);
  }
  return [...Array.from(set)];
};

export const generateTempertureValues = () => {
  const set = new Set<number>();
  for (let i = set.size; set.size < 5; ++i) {
    set.add(generateFromRange(5, 50, 1));
  }
  return [...Array.from(set)];
};
