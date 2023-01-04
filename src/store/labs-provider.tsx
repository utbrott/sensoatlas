import { LabsContext } from './labs-context';
import { useState, useReducer } from 'react';
import { sensorDefaults } from '@data/sensor-defaults';
import {
  strainConfigReducer,
  temperatureRtdConfigReducer,
  temperatureCoupleConfigReducer,
  displacementConfigReducer,
} from './reducers';

type Props = {
  children: React.ReactNode;
};

export const LabsProvider = ({ children }: Props) => {
  const [strainConfig, updateStrainConfig] = useReducer(
    strainConfigReducer,
    sensorDefaults.strain.config
  );

  const [temperatureRtdConfig, updateTemperatureRtdConfig] = useReducer(
    temperatureRtdConfigReducer,
    sensorDefaults.temperatureRtd.config
  );

  const [temperatureCoupleConfig, updateTemperatureCoupleConfig] = useReducer(
    temperatureCoupleConfigReducer,
    sensorDefaults.temperatureCouple.config
  );

  const [displacementConfig, updateDisplacementConfig] = useReducer(
    displacementConfigReducer,
    sensorDefaults.displacement.config
  );

  const handleConfigUpdate = (
    sensor: string,
    configField: string,
    value: string
  ) => {
    switch (sensor) {
      case 'temperatureRtd':
        updateTemperatureRtdConfig({
          type: `CHANGE_${configField.toUpperCase()}`,
          payload: value,
        });
      case 'temperatureCouple':
        updateTemperatureCoupleConfig({
          type: `CHANGE_${configField.toUpperCase()}`,
          payload: value,
        });
      case 'displacement':
        updateDisplacementConfig({
          type: `CHANGE_${configField.toUpperCase()}`,
          payload: value,
        });
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
  const [isLabFinished, setIsLabFinished] = useState(false);

  const labsContext = {
    temperatureRtd: {
      config: temperatureRtdConfig,
      taskPrompts: sensorDefaults.temperatureRtd.taskPrompts,
      taskData: sensorDefaults.temperatureRtd.taskData,
      validationData: sensorDefaults.temperatureRtd.validationData,
    },
    temperatureCouple: {
      config: temperatureCoupleConfig,
      taskPrompts: sensorDefaults.temperatureCouple.taskPrompts,
      taskData: sensorDefaults.temperatureCouple.taskData,
      validationData: sensorDefaults.temperatureCouple.validationData,
    },
    displacement: {
      config: displacementConfig,
      taskPrompts: sensorDefaults.displacement.taskPrompts,
      taskData: sensorDefaults.displacement.taskData,
      validationData: sensorDefaults.displacement.validationData,
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
    isLabFinished: isLabFinished,
    updateConfig: handleConfigUpdate,
    saveConfig: () => setIsConfigSaved(true),
    updateValidationState: () => setIsValidationAvailable(true),
    updateLabFinishedState: () => setIsLabFinished(true),
  };

  return (
    <LabsContext.Provider value={labsContext}>{children}</LabsContext.Provider>
  );
};
