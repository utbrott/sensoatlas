const calculateResistanceInTemperature = (
  res: string,
  coeff: number,
  temp: number
) => {
  const resistance = parseInt(res);
  const REF_TEMPERATURE = 0;
  const value = resistance * (1 + coeff * (temp - REF_TEMPERATURE));

  return parseFloat(value.toFixed(2));
};

const calculateTimeConstant = (
  conductivity: number,
  density: number,
  heatCapacity: number,
  thick?: string
) => {
  const SENSOR_THICKNESS = 2;
  const LENGTH = 15 * 10 ** -3;

  let thickness: number;
  if (thick && typeof thick === 'string') {
    thickness = parseFloat(thick);
  } else {
    thickness = SENSOR_THICKNESS;
  }

  const value =
    ((thickness * 10 ** -3) / conductivity) * density * LENGTH * heatCapacity;
  return parseFloat(value.toFixed(2));
};

export const tauValidation = (context: any) => {
  const { sensorMaterial, fillerMaterial, thickness } =
    context.temperatureRtd.config;

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
    sensorMaterial.heatCapacity
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

  return [bareTCValue, sheathTCValue, thermowellTCValue];
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
