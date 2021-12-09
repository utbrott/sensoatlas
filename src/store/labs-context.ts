import { createContext } from 'react';

export const LabsContext = createContext({
  temperature: {
    config: {},
    tasks: {
      prompts: [{ id: 0, prompt: '' }],
      data: [],
    },
    answers: [{ promptId: 0, values: [] }],
  },
  displacement: {
    config: {},
    tasks: {
      prompts: [{ id: 0, prompt: '' }],
      data: [],
    },
    answers: [{ promptId: 0, values: [] }],
  },
  strain: {
    config: {
      metal_gf: '',
      inputVoltage: '',
      resistance: '',
      bridge: '',
    },
    tasks: {
      prompts: [{ id: 0, prompt: '' }],
      data: [],
    },
    answers: [{ promptId: 0, values: [] }],
  },
  piezoelectric: {
    config: {},
    tasks: {
      prompts: [{ id: 0, prompt: '' }],
      data: [],
    },
    answers: [{ promptId: 0, values: [] }],
  },
  isConfigSaved: false,
  updateConfig: (sensor: string, configField: string, value: string) => {},
  saveConfig: () => {},
});
