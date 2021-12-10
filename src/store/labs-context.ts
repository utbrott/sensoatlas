import { createContext } from 'react';

export const LabsContext = createContext({
  temperature: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [0, 0, 0, 0, 0] },
    answers: [{ promptId: 0, values: [] }],
  },
  displacement: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [0, 0, 0, 0, 0] },
    answers: [{ promptId: 0, values: [] }],
  },
  strain: {
    config: {
      metal: '',
      sensitivity: '',
      modulus: '',
      inputVoltage: '',
      resistance: '',
      bridge: '',
    },
    taskPrompts: { 0: '' },
    taskData: { 0: [0, 0, 0, 0, 0] },
    answers: [{ promptId: 0, values: [] }],
  },
  piezoelectric: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [0, 0, 0, 0, 0] },
    answers: [{ promptId: 0, values: [] }],
  },
  isConfigSaved: false,
  updateConfig: (sensor: string, configField: string, value: string) => {},
  saveConfig: () => {},
  updateTaskData: (sensor: string, taskId: number, data: number) => {},
});
