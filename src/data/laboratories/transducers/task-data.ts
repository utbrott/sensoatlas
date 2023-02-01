import {
  getRandomSet,
  GetRandomMinMax,
  getRandomInRange
} from '@data/data-generation';
import { round } from 'lodash';

export const getRandomPressure = ({ min, max }: GetRandomMinMax) => {
  min = round(min, 2);
  max = round(max, 2);

  return getRandomSet(5, { min, max, step: 0.105 });
};

interface GetPressureSlope {
  timeConstant: number;
}

export const getPressureSlope = ({ timeConstant }: GetPressureSlope) => {
  const PRESSURE = {
    CHANGE: 1.575,
    START: 2.5,
    END: 0
  };

  function getSlopeValue(time: number, timeConstant: number) {
    return round(
      PRESSURE.START -
        (PRESSURE.END - PRESSURE.START) * Math.exp((time / timeConstant) * -1),
      2
    );
  }

  const time: number[] = [];

  for (let i = 0; i <= 30; i++) {
    time[i] = i;
  }

  const pressureTimeConstant: number[] = [];

  time.forEach(tick => {
    if (tick < 15) {
      pressureTimeConstant.push(getSlopeValue(0, timeConstant));
      return;
    }

    pressureTimeConstant.push(getSlopeValue(tick - 15, timeConstant));
  });

  return {
    xvalue: time,
    yvalues: pressureTimeConstant
  };
};

interface GetRangePercentValue {
  transducer: 'voltage' | 'resistance' | string;
  resistanceLimit: number;
}

export const getRangePercentValue = ({
  transducer,
  resistanceLimit
}: GetRangePercentValue) => {
  const LOWER_PERCENT = 0.25;
  const UPPER_PERECET = 0.75;

  const VOLTAGE_RANGE = 50;
  const RESISTANCE_LOWER = 100;

  const resistanceRange = resistanceLimit - RESISTANCE_LOWER;

  function getValueAtPercent(max: number, percent: number) {
    return round(max * percent, 2);
  }

  let lower: number;
  let upper: number;

  switch (transducer) {
    case 'voltage':
      lower = getValueAtPercent(VOLTAGE_RANGE, LOWER_PERCENT);
      upper = getValueAtPercent(VOLTAGE_RANGE, UPPER_PERECET);
      break;
    case 'resistance':
      lower = getValueAtPercent(resistanceRange, LOWER_PERCENT) + 100;
      upper = getValueAtPercent(resistanceRange, UPPER_PERECET) + 100;
      break;
  }

  return [lower, upper];
};

interface GetResistanceRange {
  resistanceLimit: number;
}

export const getResistanceRange = ({ resistanceLimit }: GetResistanceRange) => {
  const lower = getRandomInRange(10, 30, 0.5);
  const upper = getRandomInRange(
    (resistanceLimit - 10) * 0.9,
    resistanceLimit * 0.9,
    0.5
  );

  return [lower, upper];
};
