export const sensorDefaults = {
  temperature: {},
  displacement: {},
  strain: {
    config: {
      metal: 'copper',
      sensitivity: '2.6',
      modulus: '110',
      inputVoltage: '5',
      resistance: '120',
      bridge: 'quater',
      bridgeMultiplier: '0.25',
    },
    taskPrompts: {
      0: 'Given values of applied strain Ɛ (μƐ), calculate the output voltage Vout (mV).',
      1: 'Given the values of temperature T (°C), calculate the output voltage Vout (mV).',
    },
    taskData: {
      0: [],
      1: [],
    },
    validationData: {
      0: [],
      1: [],
    },
    submittedAnswers: {
      0: [],
      1: [],
    },
  },
  piezoelectric: {},
};
