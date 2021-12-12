import { createContext } from 'react';

export const LabsContext = createContext({
  temperature: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
  },
  displacement: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
  },
  strain: {
    config: {
      metal: '',
      gaugeFactor: 0,
      modulus: 0,
      temperatureCoefficient: 0,
      inputVoltage: '',
      resistance: '',
      bridge: '',
      bridgeMultiplier: 0,
    },
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
  },
  piezoelectric: {
    config: {},
    taskPrompts: { 0: '' },
    taskData: { 0: [] },
    validationData: { 0: [] },
  },
  isConfigSaved: false,
  updateConfig: (sensor: string, configField: string, value: string) => {},
  saveConfig: () => {},
});
