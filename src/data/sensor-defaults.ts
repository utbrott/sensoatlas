import { taskPrompts } from './task-prompts';

export const sensorDefaults = {
  temperatureRtd: {
    config: {
      sensorMaterial: {
        metal: 'platinum',
        tempCoeff: 0.003729,
        density: 21.45,
        heatCapacity: 0.133,
        conductivity: 69.1,
      },
      fillerMaterial: {
        type: 'mgoPowder',
        density: 3.58,
        heatCapacity: 0.877,
        conductivity: 26.8,
      },
      resistance: '100',
    },
    taskPrompts: taskPrompts.temperatureRtd,
    taskData: {
      0: [],
      1: [],
    },
    validationData: {
      0: [],
      1: [],
    },
  },
  temperatureCouple: {},
  displacement: {},
  strain: {
    config: {
      material: {
        metal: 'copper',
        gaugeFactor: 2.6,
        modulus: 110,
        tempCoeff: 0.004041,
      },
      inputVoltage: '5',
      resistance: '120',
      bridge: {
        type: 'quater',
        multiplier: 0.25,
      },
    },
    taskPrompts: taskPrompts.strain,
    taskData: {
      0: [],
      1: [],
    },
    validationData: {
      0: [],
      1: [],
    },
  },
  piezoelectric: {},
};
