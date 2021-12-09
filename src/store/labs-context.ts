import { createContext } from 'react';

export const LabsContext = createContext({
  config: {
    temperature: {},
    displacement: {},
    strain: {
      metal: 'copper',
      inputVoltage: '5',
      resistance: '120',
      bridge: 'quater',
    },
    piezoelectric: {},
  },
  isConfigSaved: false,
  updateConfig: (sensor: string, configField: string, value: string) => {},
  saveConfig: () => {},
});
