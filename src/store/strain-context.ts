import { createContext } from 'react';

export const StrainContext = createContext({
  config: {
    metal: 'copper',
    inputVoltage: '5',
    resistance: '120',
    bridge: 'quater',
  },
  updateConfig: (configField: string, value: string) => {},
});
