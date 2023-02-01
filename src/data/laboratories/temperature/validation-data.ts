import { round } from 'lodash';

const getResistanceInTemperature = (
  resistance: number,
  temperature: { coeff: number; value: number }
) => {
  const REF_TEMPERATURE = 0;

  return round(
    resistance *
      (1 + temperature.coeff * (temperature.value - REF_TEMPERATURE)),
    2
  );
};

const getVoltageInTemperature = (
  coeff: number,
  temperature: {
    reference: number;
    generated: number;
  }
) => {
  return round(
    coeff * 10 ** -3 * (temperature.generated - temperature.reference),
    2
  );
};

const getTimeConstant = (
  conductivity: number,
  density: number,
  heatCapacity: number,
  thickness: number
) => {
  const LENGTH = 15 * 10 ** -3;
  thickness = thickness * 10 ** -3;

  return round((thickness / conductivity) * density * LENGTH * heatCapacity, 2);
};

interface RtdValidationFnProps {
  coeff: number;
  resistance: number;
  taskData: number[];
}

export const getRtdResistanceValidation = ({
  coeff,
  resistance,
  taskData
}: RtdValidationFnProps) => {
  const data: number[] = [];

  taskData.forEach(dataPoint => {
    data.push(
      getResistanceInTemperature(resistance, { coeff, value: dataPoint })
    );
  });

  return [...data];
};

interface ThermocoupleValidationFnProps {
  coeff: number;
  temperature: number;
  taskData: number[];
}

export const getThermocoupleVoltageValidation = ({
  coeff,
  temperature,
  taskData
}: ThermocoupleValidationFnProps) => {
  const data: number[] = [];

  taskData.forEach(dataPoint => {
    data.push(
      getVoltageInTemperature(coeff, {
        reference: temperature,
        generated: dataPoint
      })
    );
  });

  return [...data];
};

const MATERIALS = {
  AIR: {
    density: 1.225,
    conductivity: 0.025,
    heatCapacity: 1005,
    thickness: 0.2
  },
  SS304: {
    density: 8030,
    conductivity: 21.4,
    heatCapacity: 500
  }
};

interface TauValidationFnProps {
  sensor: {
    type: 'rtd' | 'thermocouple';
    density: number;
    heatCapacity: number;
    conductivity: number;
  };
  filler: {
    density: number;
    heatCapacity: number;
    conductivity: number;
  };
  thickness: number;
}

export const getTauValidationData = ({
  sensor,
  filler,
  thickness
}: TauValidationFnProps) => {
  const THICKNESS_RTD = 2;
  const THICKNESS_THERMOCOUPLE = 1.25;

  const bareTimeConstant = getTimeConstant(
    sensor.conductivity,
    sensor.density,
    sensor.heatCapacity,
    sensor.type === 'rtd' ? THICKNESS_RTD : THICKNESS_THERMOCOUPLE
  );

  const airTimeConstant = getTimeConstant(
    MATERIALS.AIR.conductivity,
    MATERIALS.AIR.density,
    MATERIALS.AIR.heatCapacity,
    MATERIALS.AIR.thickness
  );

  const casingTimeConstant = getTimeConstant(
    MATERIALS.SS304.conductivity,
    MATERIALS.SS304.density,
    MATERIALS.SS304.heatCapacity,
    thickness
  );

  const FILLER_THICKNESS = 2.5;
  const fillerTimeConstant = getTimeConstant(
    filler.conductivity,
    filler.density,
    filler.conductivity,
    FILLER_THICKNESS
  );

  const sheathedTimeConstant =
    bareTimeConstant + airTimeConstant + casingTimeConstant;

  const thermowellTimeConstant =
    sheathedTimeConstant + casingTimeConstant + fillerTimeConstant;

  return [
    round(bareTimeConstant, 2),
    round(sheathedTimeConstant, 2),
    round(thermowellTimeConstant, 2)
  ];
};
