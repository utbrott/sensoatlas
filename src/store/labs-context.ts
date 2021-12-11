import { createContext } from 'react';

export const LabsContext = createContext({
  temperature: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
    submittedAnswers: { 0: [] },
  },
  displacement: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
    submittedAnswers: { 0: [] },
  },
  strain: {
    config: {
      metal: '',
      sensitivity: '',
      modulus: '',
      inputVoltage: '',
      resistance: '',
      bridge: '',
      bridgeMultiplier: '',
    },
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
    submittedAnswers: { 0: [] },
  },
  piezoelectric: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
    submittedAnswers: { 0: [] },
  },
  isConfigSaved: false,
  updateConfig: (sensor: string, configField: string, value: string) => {},
  saveConfig: () => {},
});
