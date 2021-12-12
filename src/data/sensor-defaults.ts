export const sensorDefaults = {
  temperature: {},
  displacement: {},
  strain: {
    config: {
      metal: 'copper',
      gaugeFactor: 2.6,
      modulus: 110,
      temperatureCoefficient: 0.004041,
      inputVoltage: '5',
      resistance: '120',
      bridge: 'quater',
      bridgeMultiplier: 0.25,
    },
    taskPrompts: {
      0: 'Given values of applied strain $\\varepsilon\\;(\\mu\\varepsilon)$, calculate the output voltage Vout (mV).',
      1: 'Given the values of temperature T ($^\\circ C$), calculate the output voltage Vout (mV).',
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
