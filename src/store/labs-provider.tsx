import { LabsContext } from './labs-context';
import { useState, useReducer } from 'react';

type Props = {
  children: React.ReactNode;
};

const strainDefaults = {
  config: {
    metal_gf: '2.6',
    inputVoltage: '5',
    resistance: '120',
    bridge: 'quater',
  },
  tasks: {
    prompts: [
      {
        id: 1,
        prompt: 'Given values of applied strain Ɛ, calculate the output voltage (Vout).',
      },
      {
        id: 2,
        prompt: 'Given the values of temperature T, calculate the output voltage (Vout)',
      },
    ],
    data: [],
  },
  answers: [
    {
      promptId: 1,
      values: [],
    },
    {
      promptId: 2,
      values: [],
    },
  ],
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
      return strainDefaults.config;
  }
};

export const LabsProvider = ({ children }: Props) => {
  const [strainConfig, updateStrainConfig] = useReducer(strainConfigReducer, strainDefaults.config);
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

  const labsContext = {
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
      config: strainConfig,
      tasks: strainDefaults.tasks,
      answers: strainDefaults.answers,
    },
    piezoelectric: {
      config: {},
      tasks: {
        prompts: [{ id: 0, prompt: '' }],
        data: [],
      },
      answers: [{ promptId: 0, values: [] }],
    },
    isConfigSaved: isConfigSaved,
    updateConfig: handleConfigUpdate,
    saveConfig: handleConfigSave,
  };

  return <LabsContext.Provider value={labsContext}>{children}</LabsContext.Provider>;
};
