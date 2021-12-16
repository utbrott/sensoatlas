import { generateFromRange } from './generate-from-range';

const calculateStrain = (mod: number, area: number, mass: number) => {
  const modulus = mod * Math.pow(10, 9);
  let value = ((mass * 9.81) / (area * modulus)) * Math.pow(10, 6);
  return parseFloat(value.toFixed(2));
};

const calculateOutputVoltage = (
  bridge: number,
  input: string,
  strain: number,
  gf: number,
  tempCoeff?: number,
  temp?: number
) => {
  const inputVoltage = parseInt(input);

  if (tempCoeff && temp) {
    const REF_TEMPERATURE = 20;
    const temperatureEffect = tempCoeff * (temp - REF_TEMPERATURE);
    const value = bridge * inputVoltage * strain * gf + temperatureEffect;
    return parseFloat(value.toFixed(2));
  }

  let value = bridge * inputVoltage * strain * gf;
  return parseFloat(value.toFixed(2));
};

export const generateStrainValues = (context: any) => {
  const { modulus } = context.strain.config.material;

  const AREA = 0.05 * 0.005;
  const MIN_MASS = 0.5;
  const MAX_MASS = 10;

  const MIN_STRAIN = calculateStrain(modulus, AREA, MIN_MASS);
  const MAX_STRAIN = calculateStrain(modulus, AREA, MAX_MASS);

  const set = new Set<number>();
  for (let i = set.size; set.size < 5; ++i) {
    const value = parseFloat(
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

export const calcValidationData = (context: any, withTemperature?: boolean) => {
  const { config } = context.strain;

  const { inputVoltage } = config;
  const { gaugeFactor, tempCoeff } = config.material;
  const { multiplier } = config.bridge;

  const strain = context.strain.taskData['0'];
  const temperature = context.strain.taskData['1'];

  console.log(inputVoltage, gaugeFactor, tempCoeff, multiplier);

  let data: number[] = [];
  if (withTemperature) {
    strain.forEach((value: number, index: number) =>
      data.push(
        calculateOutputVoltage(
          multiplier,
          inputVoltage,
          value,
          gaugeFactor,
          tempCoeff,
          temperature[index]
        )
      )
    );
    console.log(data);
    return [...data];
  }
  strain.forEach((value: number) =>
    data.push(
      calculateOutputVoltage(multiplier, inputVoltage, value, gaugeFactor)
    )
  );
  return [...data];
};
