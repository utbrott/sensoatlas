import { round } from 'lodash';

const calculateResistanceInTemperature = (
  res: string,
  coeff: number,
  temp: number
) => {
  const resistance = parseInt(res);
  const REF_TEMPERATURE = 0;
  const value = resistance * (1 + coeff * (temp - REF_TEMPERATURE));

  return round(value, 2);
};

const calculateVoltageInTemperature = (
  coeff: number,
  genTemp: number,
  refTemp: string
) => {
  const refTemperature = parseFloat(refTemp);
  const value = coeff * 10 ** -3 * (genTemp - refTemperature);

  return round(value, 2);
};

const calculateTimeConstant = (
  conductivity: number,
  density: number,
  heatCapacity: number,
  thick: string
) => {
  const LENGTH = 15 * 10 ** -3;
  let thickness = parseFloat(thick);
  thickness = thickness * 10 ** -3;

  const value = (thickness / conductivity) * density * LENGTH * heatCapacity;

  return round(value, 2);
};

export const tauValidationRtd = (context: any) => {
  const { sensorMaterial, fillerMaterial, thickness } =
    context.temperatureRtd.config;

  const SENSOR_THICKNESS = '2';
  const FILLER_THICKNESS = '2.5';

  const AIR_PROPERTIES = {
    density: 1.225,
    conductivity: 0.025,
    heatCapacity: 1005,
    thickness: '0.2',
  };

  const SS304_PROPERTIES = {
    density: 8030,
    conductivity: 21.4,
    heatCapacity: 500,
  };

  const bareTimeConstant = calculateTimeConstant(
    sensorMaterial.conductivity,
    sensorMaterial.density,
    sensorMaterial.heatCapacity,
    SENSOR_THICKNESS
  );

  const airTimeConstant = calculateTimeConstant(
    AIR_PROPERTIES.conductivity,
    AIR_PROPERTIES.density,
    AIR_PROPERTIES.heatCapacity,
    AIR_PROPERTIES.thickness
  );

  const metalTimeConstant = calculateTimeConstant(
    SS304_PROPERTIES.conductivity,
    SS304_PROPERTIES.density,
    SS304_PROPERTIES.heatCapacity,
    thickness
  );

  const fillerMaterialTimeConstant = calculateTimeConstant(
    fillerMaterial.conductivity,
    fillerMaterial.density,
    fillerMaterial.heatCapacity,
    FILLER_THICKNESS
  );

  const bareTCValue = bareTimeConstant;
  const sheathTCValue = bareTimeConstant + airTimeConstant + metalTimeConstant;
  const thermowellTCValue =
    sheathTCValue + metalTimeConstant + fillerMaterialTimeConstant;

  return [
    round(bareTCValue, 2),
    round(sheathTCValue, 2),
    round(thermowellTCValue, 2),
  ];
};

export const tauValidationCouple = (context: any) => {
  const { thermocouple, fillerMaterial, thickness } =
    context.temperatureCouple.config;

  const SENSOR_THICKNESS = '1.25';
  const FILLER_THICKNESS = '2.5';

  const AIR_PROPERTIES = {
    density: 1.225,
    conductivity: 0.025,
    heatCapacity: 1005,
    thickness: '0.2',
  };

  const SS304_PROPERTIES = {
    density: 8030,
    conductivity: 21.4,
    heatCapacity: 500,
  };

  const bareTimeConstant = calculateTimeConstant(
    thermocouple.conductivity,
    thermocouple.density,
    thermocouple.heatCapacity,
    SENSOR_THICKNESS
  );

  const airTimeConstant = calculateTimeConstant(
    AIR_PROPERTIES.conductivity,
    AIR_PROPERTIES.density,
    AIR_PROPERTIES.heatCapacity,
    AIR_PROPERTIES.thickness
  );

  const metalTimeConstant = calculateTimeConstant(
    SS304_PROPERTIES.conductivity,
    SS304_PROPERTIES.density,
    SS304_PROPERTIES.heatCapacity,
    thickness
  );

  const fillerMaterialTimeConstant = calculateTimeConstant(
    fillerMaterial.conductivity,
    fillerMaterial.density,
    fillerMaterial.heatCapacity,
    FILLER_THICKNESS
  );

  const bareTCValue = bareTimeConstant;
  const sheathTCValue = bareTimeConstant + airTimeConstant + metalTimeConstant;
  const thermowellTCValue =
    sheathTCValue + metalTimeConstant + fillerMaterialTimeConstant;

  return [
    round(bareTCValue, 2),
    round(sheathTCValue, 2),
    round(thermowellTCValue, 2),
  ];
};

export const rtdResistanceValidation = (context: any) => {
  const { sensorMaterial, resistance } = context.temperatureRtd.config;
  const { tempCoeff } = sensorMaterial;
  const generatedTemperature = context.temperatureRtd.taskData['0'];

  let data: number[] = [];
  generatedTemperature.forEach((value: number) =>
    data.push(calculateResistanceInTemperature(resistance, tempCoeff, value))
  );

  return [...data];
};

export const thermocoupleVoltageValidation = (context: any) => {
  const { thermocouple, refTemperature } = context.temperatureCouple.config;
  const { seebeckCoeff } = thermocouple;
  const generatedTemperature = context.temperatureCouple.taskData['0'];

  let data: number[] = [];
  generatedTemperature.forEach((value: number) => {
    data.push(
      calculateVoltageInTemperature(seebeckCoeff, value, refTemperature)
    );
  });

  return [...data];
};
