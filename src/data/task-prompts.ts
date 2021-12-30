type TaskPrompts = {
  [key: string]: { taskId: number; content: string; hasData: boolean }[];
};

export const taskPrompts: TaskPrompts = {
  temperatureRtd: [
    {
      taskId: 1,
      content:
        'Given the values of temperature T $[^\\circ C]$, calculate sensors resistance Rt $[\\Omega]$.',
      hasData: true,
    },
    {
      taskId: 2,
      content:
        'Based on selected sensor configuration, calculate time constant $\\tau[\\text{s}]$ of sensor (bare, sheathed and in thermowell).',
      hasData: false,
    },
  ],
  temperatureCouple: [
    {
      taskId: 1,
      content:
        'Given the values of temperature T $[^\\circ C]$, calculate the output voltage $[mV]$.',
      hasData: true,
    },
    {
      taskId: 2,
      content:
        'Based on selected sensor configuration, calculate time constant $\\tau[\\text{s}]$ of sensor (bare, sheathed and in thermowell).',
      hasData: false,
    },
  ],
  displacement: [
    {
      taskId: 1,
      content:
        'Given the values of displacement x [mm], calculate the output voltage Vout [mV]',
      hasData: true,
    },
  ],
  strain: [
    {
      taskId: 1,
      content:
        'Given values of applied strain $\\varepsilon\\;[\\mu\\varepsilon]$, calculate the output voltage Vout [mV].',
      hasData: true,
    },
    {
      taskId: 2,
      content:
        'Given the values of temperature T $[^\\circ C]$ and strain $\\varepsilon\\;[\\mu\\varepsilon]$ = 1.5, calculate the output voltage Vout [mV].',
      hasData: true,
    },
  ],
  piezoelectric: [
    {
      taskId: 1,
      content: '',
      hasData: true,
    },
  ],
};
