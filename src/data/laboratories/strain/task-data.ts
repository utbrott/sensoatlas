import { round } from 'lodash';
import { getRandomSet } from '@data/data-generation';

export function getStrain(modulus: number, area: number, mass: number) {
  modulus = modulus * 10 ** 9;
  return round(((mass * 9.81) / (area * modulus)) * 10 ** 6, 2);
}

interface GetRandomStrainSet {
  modulus: number;
}

export const getRandomStrainSet = ({ modulus }: GetRandomStrainSet) => {
  const AREA = 0.05 * 0.005;
  const MIN_MASS = 0.5;
  const MAX_MASS = 10;

  const minStrain = getStrain(modulus, AREA, MIN_MASS);
  const maxStrain = getStrain(modulus, AREA, MAX_MASS);

  return getRandomSet(5, { min: minStrain, max: maxStrain, step: 0.1 });
};
