import { taskPrompts } from './task-prompts';

export const sensorDefaults = {
  temperature: {},
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
