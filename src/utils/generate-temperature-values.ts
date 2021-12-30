import { generateFromRange } from './generate-from-range';
import { round } from 'lodash';

type TemperatureValuesArgs = {
  min: number;
  max: number;
};

type TemperatureArgs = {
  time: number;
  tau: number;
  sensorType: 'rtd' | 'thermocouple';
};

type TemperatureSlopeArgs = {
  sensorType: 'rtd' | 'thermocouple';
  tauValuesArray: number[];
};

export const generateTempertureValues = ({
  min,
  max,
}: TemperatureValuesArgs) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const set = new Set<number>();
  set.add(min);
  for (let i = set.size; set.size < 4; ++i) {
    set.add(generateFromRange(min + 5, max - 5, 5));
  }
  set.add(max);

  return [...Array.from(set)];
};

const calculateTemperature = ({ time, tau, sensorType }: TemperatureArgs) => {
  let INITIAL_TEMPERATURE: number = 0;
  let MEDIUM_TEMPERATURE: number = 0;

  if (sensorType === 'rtd') {
    INITIAL_TEMPERATURE = 0;
    MEDIUM_TEMPERATURE = 50;
  }

  if (sensorType === 'thermocouple') {
    INITIAL_TEMPERATURE = 0;
    MEDIUM_TEMPERATURE = 300;
  }

  const value =
    MEDIUM_TEMPERATURE -
    (MEDIUM_TEMPERATURE - INITIAL_TEMPERATURE) * Math.exp(-(time / tau));

  return round(value, 2);
};

export const generateTemperatureSlope = ({
  sensorType,
  tauValuesArray,
}: TemperatureSlopeArgs) => {
  let time = [];
  for (let index = 0; index < 61; index++) {
    time[index] = index;
  }

  type SlopeData = {
    xvalue: number;
    yvalueBare: number;
    yvalueSheath: number;
    yvalueThermowell: number;
  };

  let slopeData: SlopeData[] = [];
  time.forEach((tick, index) => {
    slopeData[index] = {
      xvalue: tick,
      yvalueBare: calculateTemperature({
        time: tick,
        tau: tauValuesArray[0],
        sensorType,
      }),
      yvalueSheath: calculateTemperature({
        time: tick,
        tau: tauValuesArray[1],
        sensorType,
      }),
      yvalueThermowell: calculateTemperature({
        time: tick,
        tau: tauValuesArray[2],
        sensorType,
      }),
    };
  });

  return slopeData;
};
