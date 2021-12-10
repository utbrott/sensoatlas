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
  const handleConfigSave = () => setIsConfigSaved(true);

  const handleTaskDataUpdate = (
    sensor: string,
    taskId: number,
    data: number
  ) => {};

  const labsContext = {
    temperature: {
      config: {},
      tasks: {
        prompts: [{ id: 0, prompt: '' }],
        data: {},
      },
      answers: [{ promptId: 0, values: [] }],
    },
    displacement: {
      config: {},
      tasks: {
        prompts: [{ id: 0, prompt: '' }],
        data: {},
      },
      answers: [{ promptId: 0, values: [] }],
    },
    strain: {
      config: strainConfig,
      tasks: sensorDefaults.strain.tasks,
      answers: sensorDefaults.strain.answers,
    },
    piezoelectric: {
      config: {},
      tasks: {
        prompts: [{ id: 0, prompt: '' }],
        data: {},
      },
      answers: [{ promptId: 0, values: [] }],
    },
    isConfigSaved: isConfigSaved,
    updateConfig: handleConfigUpdate,
    saveConfig: handleConfigSave,
    updateTaskData: handleTaskDataUpdate,
  };

  return (
    <LabsContext.Provider value={labsContext}>{children}</LabsContext.Provider>
  );
};
