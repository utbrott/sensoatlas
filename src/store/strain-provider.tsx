import { StrainContext } from './strain-context';
import { useState, useReducer } from 'react';

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
  const [isConfigSaved, setIsConfigSaved] = useState(false);

  const handleConfigUpdate = (configField: string, value: string) => {
    updateConfig({ type: `CHANGE_${configField.toUpperCase()}`, payload: value });
  };

  const handleConfigSave = () => setIsConfigSaved(true);

  const strainContext = {
    config: config,
    isConfigSaved: isConfigSaved,
    updateConfig: handleConfigUpdate,
    saveConfig: handleConfigSave,
  };

  return <StrainContext.Provider value={strainContext}>{children}</StrainContext.Provider>;
};
