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
    tasks: {
      prompts: [
        {
          id: 0,
          prompt:
            'Given values of applied strain Ɛ, calculate the output voltage (Vout).',
        },
        {
          id: 1,
          prompt:
            'Given the values of temperature T, calculate the output voltage (Vout)',
        },
      ],
      data: {
        0: [0, 0, 0, 0, 0],
        1: [0, 0, 0, 0, 0],
      },
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
