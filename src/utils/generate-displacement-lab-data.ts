import { generateFromRange } from './generate-from-range';
import { round } from 'lodash';

const calculateOutVoltage = (
  frequency: string,
  voltage: string,
  turns: string,
  displacement: number
) => {
  const RESISTANCE = 10 * 10 ** 3;
  const VACUUM = 4 * Math.PI * 10 ** -7;
  const RADII_RATIO = 2;
  const PRI_LENGTH = 20;
  const SEC_LENGTH = PRI_LENGTH / 2;

  const inputValue = Number(frequency) * (Number(voltage) / RESISTANCE);
  const vacuumCoeff = 4 * Math.PI * VACUUM;
  const windingValue = 0.5 * Number(turns) ** 2;
  const coilRatio = PRI_LENGTH / (3 * SEC_LENGTH * Math.log10(RADII_RATIO));
  const winding = vacuumCoeff * windingValue * displacement * coilRatio;
  const displacementRatio = round(
    1 - displacement ** 2 / (2 * PRI_LENGTH ** 2),
    5
  );

  const value = inputValue * winding * displacementRatio;
  return round(value, 2);
};

type DisplacementValuesArgs = {
  min: number;
  max: number;
};

export const generateDisplacementValues = ({
  min,
  max,
}: DisplacementValuesArgs) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const set = new Set<number>();
  set.add(min);
  for (let i = set.size; set.size < 4; ++i) {
    set.add(generateFromRange(min + 1, max - 1, 1));
  }
  set.add(max);

  return [...Array.from(set)];
};

export const lvdtVoltageValidation = (context: any) => {
  const { turns, inputVoltage, frequency } = context.displacement.config;
  const generatedDisplacement = context.displacement.taskData['0'];

  let data: number[] = [];
  generatedDisplacement.forEach((value: number) => {
    data.push(calculateOutVoltage(frequency, inputVoltage, turns, value));
  });

  return [...data];
};
