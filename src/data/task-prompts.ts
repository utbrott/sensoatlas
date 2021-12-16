type TaskPrompts = {
  [key: string]: { taskId: number; content: string }[];
};

export const taskPrompts: TaskPrompts = {
  temperature: [
    {
      taskId: 1,
      content: '',
    },
  ],
  displacement: [
    {
      taskId: 1,
      content: '',
    },
  ],
  strain: [
    {
      taskId: 1,
      content:
        'Given values of applied strain $\\varepsilon\\;(\\mu\\varepsilon)$, calculate the output voltage Vout (mV).',
    },
    {
      taskId: 2,
      content:
        'Given the values of temperature T ($^\\circ C$), calculate the output voltage Vout (mV).',
    },
  ],
  piezoelectric: [
    {
      taskId: 1,
      content: '',
    },
  ],
};
