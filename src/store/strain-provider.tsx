import { LabsContext } from './labs-context';
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

export const LabsProvider = ({ children }: Props) => {
  const [strainConfig, updateStrainConfig] = useReducer(strainConfigReducer, defaultConfig);
  const [isConfigSaved, setIsConfigSaved] = useState(false);

  const handleConfigUpdate = (sensor: string, configField: string, value: string) => {
    switch (sensor) {
      case 'temperature':
        return null;
      case 'displacement':
        return null;
      case 'strain':
        updateStrainConfig({ type: `CHANGE_${configField.toUpperCase()}`, payload: value });
      case 'piezoelectric':
        return null;
    }
  };

  const handleConfigSave = () => setIsConfigSaved(true);

  const strainContext = {
    config: {
      temperature: {},
      displacement: {},
      strain: strainConfig,
      piezoelectric: {},
    },
    isConfigSaved: isConfigSaved,
    updateConfig: handleConfigUpdate,
    saveConfig: handleConfigSave,
  };

  return <LabsContext.Provider value={strainContext}>{children}</LabsContext.Provider>;
};
