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
      0: 'Given values of applied strain Ɛ, calculate the output voltage (Vout).',
      1: 'Given the values of temperature T, calculate the output voltage (Vout).',
    },
    taskData: {
      0: [0, 0, 0, 0, 0],
      1: [0, 0, 0, 0, 0],
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
