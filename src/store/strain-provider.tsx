import { StrainContext } from './strain-context';
import { useReducer } from 'react';

type Props = {
  children: React.ReactNode;
};

const defaultConfig = {
  metal: 'copper',
  inputVoltage: '5',
  resistance: '120',
  bridge: 'quater',
};

const strainConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_METAL':
      return { ...state, metal: action.payload };
    case 'CHANGE_VOLTAGE':
      return { ...state, inputVoltage: action.payload };
    case 'CHANGE_RESISTANCE':
      return { ...state, resistance: action.payload };
    case 'CHANGE_BRIDGE':
      return { ...state, bridge: action.payload };
    default:
      return defaultConfig;
  }
};

export const StrainProvider = ({ children }: Props) => {
  const [config, updateConfig] = useReducer(strainConfigReducer, defaultConfig);

  const handleConfigUpdate = (configField: string, value: string) => {
    updateConfig({ type: `CHANGE_${configField.toUpperCase()}`, payload: value });
  };

  const strainContext = {
    config: config,
    updateConfig: handleConfigUpdate,
  };

  return <StrainContext.Provider value={strainContext}>{children}</StrainContext.Provider>;
};
