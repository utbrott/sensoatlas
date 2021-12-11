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
    },
    taskPrompts: {
      0: 'Given values of applied strain Ɛ (μƐ), calculate the output voltage Vout (mV).',
      1: 'Given the values of temperature T (°C), calculate the output voltage Vout (mV).',
    },
    taskData: {
      0: [],
      1: [],
    },
    answers: [
      {
        promptId: 1,
        values: [],
      },
      {
        promptId: 2,
        values: [],
      },
    ],
  },
  piezoelectric: {},
};
