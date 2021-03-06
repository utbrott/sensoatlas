import { taskPrompts } from './task-prompts';

export const sensorDefaults = {
  temperatureRtd: {
    config: {
      sensorMaterial: {
        metal: 'platinum',
        tempCoeff: 0.003729,
        density: 21450,
        heatCapacity: 133,
        conductivity: 69.1,
      },
      fillerMaterial: {
        type: 'mgoPowder',
        density: 3580,
        heatCapacity: 877,
        conductivity: 26.8,
      },
      resistance: '100',
      thickness: '0.5',
    },
    taskPrompts: taskPrompts.temperatureRtd,
    taskData: {
      0: [],
    },
    validationData: {
      0: [],
      1: [],
    },
  },
  temperatureCouple: {
    config: {
      thermocouple: {
        type: 'typeJ',
        seebeckCoeff: 51,
        density: 8535,
        heatCapacity: 345,
        conductivity: 46,
      },
      fillerMaterial: {
        type: 'mgoPowder',
        density: 3580,
        heatCapacity: 877,
        conductivity: 26.8,
      },
      refTemperature: '0',
      thickness: '0.5',
    },
    taskPrompts: taskPrompts.temperatureCouple,
    taskData: {
      0: [],
    },
    validationData: {
      0: [],
      1: [],
    },
  },
  displacement: {
    config: {
      turns: '1000',
      inputVoltage: '5.0',
      frequency: '1000',
    },
    taskPrompts: taskPrompts.displacement,
    taskData: {
      0: [],
    },
    validationData: {
      0: [],
    },
  },
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
