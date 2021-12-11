import { generateFromRange } from './generate-from-range';

const calculateStrain = (mod: number, area: number, mass: number) => {
  let value = ((mass * 9.81) / (area * mod)) * Math.pow(10, 6);
  return parseFloat(value.toFixed(2));
};

const calculateOutputVoltage = (
  bridge: number,
  input: number,
  strain: number,
  gf: number,
  tempCoeff?: number,
  temp?: number
) => {
  if (tempCoeff && temp) {
    const REF_TEMPERATURE = 20;
    const temperatureEffect = tempCoeff * (temp - REF_TEMPERATURE);
    const value = bridge * input * strain * gf + temperatureEffect;
    return parseFloat(value.toFixed(2));
  }

  let value = bridge * input * strain * gf;
  return parseFloat(value.toFixed(2));
};

export const generateStrainValues = (context: any) => {
  const MODULUS = parseInt(context.strain.config.modulus) * Math.pow(10, 9);
  const AREA = 0.05 * 0.005;
  const MIN_STRAIN = calculateStrain(MODULUS, AREA, 0.5);
  const MAX_STRAIN = calculateStrain(MODULUS, AREA, 10);

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
  const INPUT_VOLTAGE = parseInt(context.strain.config.inputVoltage);
  const GAUGE_FACTOR = context.strain.config.gaugeFactor;
  const BRIDGE_MULTIPLIER = context.strain.config.bridgeMultiplier;
  const TEMP_COEFFICIENT = context.strain.config.temperatureCoefficient;
  const strain = context.strain.taskData['0'];
  const temperature = context.strain.taskData['1'];

  let data: number[] = [];
  if (withTemperature) {
    strain.forEach((value: number, index: number) =>
      data.push(
        calculateOutputVoltage(
          BRIDGE_MULTIPLIER,
          INPUT_VOLTAGE,
          value,
          GAUGE_FACTOR,
          TEMP_COEFFICIENT,
          temperature[index]
        )
      )
    );
    return [...data];
  }
  strain.forEach((value: number) =>
    data.push(
      calculateOutputVoltage(
        BRIDGE_MULTIPLIER,
        INPUT_VOLTAGE,
        value,
        GAUGE_FACTOR
      )
    )
  );
  return [...data];
};
