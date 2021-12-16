import { LabsContext } from './labs-context';
import { useState, useReducer } from 'react';
import { sensorDefaults } from '#data/sensor-defaults';
import { strainConfigReducer } from './reducers/strain-reducers';

type Props = {
  children: React.ReactNode;
};

export const LabsProvider = ({ children }: Props) => {
  const [strainConfig, updateStrainConfig] = useReducer(
    strainConfigReducer,
    sensorDefaults.strain.config
  );

  const handleConfigUpdate = (
    sensor: string,
    configField: string,
    value: string
  ) => {
    switch (sensor) {
      case 'temperature':
        return null;
      case 'displacement':
        return null;
      case 'strain':
        updateStrainConfig({
          type: `CHANGE_${configField.toUpperCase()}`,
          payload: value,
        });
      case 'piezoelectric':
        return null;
    }
  };

  const [isConfigSaved, setIsConfigSaved] = useState(false);
  const [isValidatonAvailable, setIsValidationAvailable] = useState(false);

  const labsContext = {
    temperature: {
      config: {},
      taskPrompts: [{ taskId: 0, content: '' }],
      taskData: { 0: [] },
      validationData: { 0: [] },
    },
    displacement: {
      config: {},
      taskPrompts: [{ taskId: 0, content: '' }],
      taskData: { 0: [] },
      validationData: { 0: [] },
    },
    strain: {
      config: strainConfig,
      taskPrompts: sensorDefaults.strain.taskPrompts,
      taskData: sensorDefaults.strain.taskData,
      validationData: sensorDefaults.strain.validationData,
    },
    piezoelectric: {
      config: {},
      taskPrompts: [{ taskId: 0, content: '' }],
      taskData: { 0: [] },
      validationData: { 0: [] },
    },
    isConfigSaved: isConfigSaved,
    isValidationAvailable: isValidatonAvailable,
    updateConfig: handleConfigUpdate,
    saveConfig: () => setIsConfigSaved(true),
    updateValidationState: () => setIsValidationAvailable(true),
  };

  return (
    <LabsContext.Provider value={labsContext}>{children}</LabsContext.Provider>
  );
};
