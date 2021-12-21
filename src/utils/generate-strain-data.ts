import { generateFromRange } from './generate-from-range';

const calculateStrain = (mod: number, area: number, mass: number) => {
  const modulus = mod * 10 ** 9;
  let value = ((mass * 9.81) / (area * modulus)) * 10 ** 6;
  return parseFloat(value.toFixed(3));
};

const calculateTemperatureEffect = (coeff: number, tempValue: number) => {
  const REF_TEMPERATURE = 20;
  return coeff * (tempValue - REF_TEMPERATURE);
};

const calculateResistanceChange = (strain: number, gf: number) => {
  return strain * gf;
};

const calculateNewResistance = (
  res: string,
  strain: number,
  gf: number,
  coeff: number,
  temp: number
) => {
  const resistance = parseInt(res);
  const strainValue = strain / 10 ** 6;
  const DELTA_RESISTANCE = calculateResistanceChange(strainValue, gf);
  const TEMP_EFFECT = calculateTemperatureEffect(coeff, temp);

  const value = resistance * (1 + DELTA_RESISTANCE + TEMP_EFFECT);
  return parseFloat(value.toFixed(3));
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
  const DELTA_RESISTANCE = calculateResistanceChange(strain, gf);

  if (tempCoeff && temp) {
    const TEMP_EFFECT = calculateTemperatureEffect(tempCoeff, temp);
    const value = bridge * inputVoltage * DELTA_RESISTANCE + TEMP_EFFECT;
    return parseFloat(value.toFixed(3));
  }

  const value = bridge * inputVoltage * DELTA_RESISTANCE;
  return parseFloat(value.toFixed(3));
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
      generateFromRange(MIN_STRAIN, MAX_STRAIN, 0.1).toFixed(3)
    );
    set.add(value);
  }
  return [...Array.from(set)];
};

export const generateTempertureValues = () => {
  const set = new Set<number>();
  set.add(0);
  for (let i = set.size; set.size < 4; ++i) {
    set.add(generateFromRange(0, 45, 5));
  }
  set.add(50);

  return [...Array.from(set)];
};

export const strainValidationData = (
  context: any,
  withTemperature?: boolean
) => {
  const { config } = context.strain;
  const { inputVoltage } = config;
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
          tempCoeff,
          STATIC_TEMPERATURE
        )
      )
    );
    return [...data];
  }
  generatedStrain.forEach((value: number) =>
    data.push(
      calculateOutputVoltage(multiplier, inputVoltage, value, gaugeFactor)
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
