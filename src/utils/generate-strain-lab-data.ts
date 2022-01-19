import { generateFromRange } from './generate-from-range';
import { round } from 'lodash';

const calculateStrain = (mod: number, area: number, mass: number) => {
  const modulus = mod * 10 ** 9;
  const value = ((mass * 9.81) / (area * modulus)) * 10 ** 6;
  return round(value, 2);
};

const calculateTemperatureEffect = (
  coeff: number,
  tempValue: number,
  resistance: string
) => {
  const REF_TEMPERATURE = 20;
  const value = Number(resistance) * coeff * (tempValue - REF_TEMPERATURE);
  return value;
};

const calculateResistanceChange = (
  strain: number,
  gf: number,
  resistance?: string
) => {
  const value = Number(resistance) * strain * gf;
  return value;
};

const calculateNewResistance = (
  res: string,
  strain: number,
  gf: number,
  coeff: number,
  temp: number
) => {
  const strainValue = strain / 10 ** 6;
  const DELTA_RESISTANCE = calculateResistanceChange(strainValue, gf, res);
  const TEMP_EFFECT = calculateTemperatureEffect(coeff, temp, res);

  const value = Number(res) + DELTA_RESISTANCE + TEMP_EFFECT;
  return round(value, 2);
};

const calculateOutputVoltage = (
  bridge: number,
  input: string,
  strain: number,
  gf: number,
  resistance?: string,
  tempCoeff?: number,
  temp?: number
) => {
  let deltaResistance: number;
  deltaResistance = calculateResistanceChange(strain, gf, resistance);

  if (tempCoeff && temp && resistance) {
    const TEMP_EFFECT = calculateTemperatureEffect(tempCoeff, temp, resistance);
    const value =
      bridge *
      Number(input) *
      ((deltaResistance + TEMP_EFFECT) / Number(resistance));
    return round(value, 2);
  }

  const value = bridge * Number(input) * (deltaResistance / Number(resistance));
  return round(value, 2);
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
    const value = generateFromRange(MIN_STRAIN, MAX_STRAIN, 0.1);
    set.add(round(value, 2));
  }
  return [...Array.from(set)];
};

export const strainValidationData = (
  context: any,
  withTemperature?: boolean
) => {
  const { config } = context.strain;
  const { inputVoltage, resistance } = config;
  const { gaugeFactor, tempCoeff } = config.material;
  const { type, multiplier } = config.bridge;
  const STATIC_STRAIN = 1.5;
  const STATIC_TEMPERATURE = 20;
  const generatedStrain = context.strain.taskData['0'];
  const generatedTemperature = context.strain.taskData['1'];

  let data: number[] = [];
  if (withTemperature) {
    if (type === 'quater') {
      generatedTemperature.forEach((value: number) =>
        data.push(
          calculateOutputVoltage(
            multiplier,
            inputVoltage,
            STATIC_STRAIN,
            gaugeFactor,
            resistance,
            tempCoeff,
            value
          )
        )
      );
      return [...data];
    }
    generatedTemperature.forEach(() =>
      data.push(
        calculateOutputVoltage(
          multiplier,
          inputVoltage,
          STATIC_STRAIN,
          gaugeFactor,
          resistance,
          tempCoeff,
          STATIC_TEMPERATURE
        )
      )
    );
    return [...data];
  }
  generatedStrain.forEach((value: number) =>
    data.push(
      calculateOutputVoltage(
        multiplier,
        inputVoltage,
        value,
        gaugeFactor,
        resistance
      )
    )
  );
  return [...data];
};

export const strainGaugeNewResistance = (context: any) => {
  const { config } = context.strain;
  const { resistance } = config;
  const { gaugeFactor, tempCoeff } = config.material;
  const { type } = config.bridge;
  const STATIC_STRAIN = 1.5;
  const STATIC_TEMPERATURE = 20;
  const generatedTemperature = context.strain.taskData['1'];

  let data: number[] = [];
  if (type === 'quater') {
    generatedTemperature.forEach((value: number) =>
      data.push(
        calculateNewResistance(
          resistance,
          STATIC_STRAIN,
          gaugeFactor,
          tempCoeff,
          value
        )
      )
    );
  }
  generatedTemperature.forEach(() =>
    data.push(
      calculateNewResistance(
        resistance,
        STATIC_STRAIN,
        gaugeFactor,
        tempCoeff,
        STATIC_TEMPERATURE
      )
    )
  );

  return [...data];
};
