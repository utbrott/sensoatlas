import React, { useContext } from 'react';
import { LabsContext } from '#store/labs-context';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { useConfigSave } from '#hooks/use-config-save';
import { TasksCard, TaskData, FormCard, Form } from '#components/task';
import { useFormInput } from '#hooks/use-form-input';
import { useFormValidation } from '#hooks/use-form-validation';
import { useCompleteTask } from '#hooks/use-complete-task';
import {
  ChartsCard,
  SingleLineChart,
  MultiLineChart,
  ChartTabs,
} from '#components/chart';
import { useSingleLineChartData } from '#hooks/use-chart-data';
import { generateTemperatureSlope } from '#utils/generate-temperature-values';

export const RTDSensor = () => {
  const context = useContext(LabsContext);
  const { taskData, validationData } = context.temperatureRtd;
  const schematicImage = `/images/temperature-rtd.png`;

  const { handleConfigSave } = useConfigSave();

  const {
    value: resistanceValue,
    index: resistanceIndex,
    isFieldEmpty: resistanceInputEmpty,
    isFieldInvalid: resistanceInputInvalid,
    handleChange: handleResistanceInputChange,
    handleReset: resetResistanceInput,
  } = useFormInput(validationData['0'], 'task1');

  const {
    value: timeConstantValue,
    index: timeConstantIndex,
    isFieldEmpty: timeConstantInputEmpty,
    isFieldInvalid: timeConstantInputInvalid,
    handleChange: handleTimeConstantInputChange,
    handleReset: resetTimeConstantInput,
  } = useFormInput(validationData['1'], 'task2');

  const {
    hasError: resistanceHasError,
    error: resistanceError,
    handleSubmit: handleResistanceFormSubmit,
  } = useFormValidation(
    resistanceInputEmpty,
    resistanceInputInvalid,
    resetResistanceInput
  );

  const {
    hasError: timeConstantHasError,
    error: timeConstantError,
    handleSubmit: handleTimeConstantFormSubmit,
  } = useFormValidation(
    timeConstantInputEmpty,
    timeConstantInputInvalid,
    resetTimeConstantInput
  );

  useCompleteTask(resistanceIndex === 5 && timeConstantIndex === 3);

  const { data: temperatureResistance } = useSingleLineChartData({
    input1: taskData['0'],
    input2: validationData['0'],
  });

  const timeTemperatureRtd = generateTemperatureSlope({
    sensorType: 'rtd',
    tauValuesArray: validationData['1'],
  });

  const tabsData = [
    {
      tabTitle: 'Task 1: Static RTD sensor characteristic',
      chart: (
        <SingleLineChart
          data={temperatureResistance}
          chartName='temperature-resistance'
          xlabel='Temperature [°C]'
          ylabel='Resistance [Ω]'
        />
      ),
    },
    {
      tabTitle: 'Task 2: Dynamic RTD sensor characteristic',
      chart: (
        <MultiLineChart
          data={timeTemperatureRtd}
          chartName='time-temperature-rtd'
          xlabel='Time [s]'
          ylabel='Temperature [°C]'
        />
      ),
    },
  ];

  return (
    <Content>
      <Config
        sensorName='temperatureRtd'
        context={context}
        setIsSaved={handleConfigSave}
        imageSource={schematicImage}
      />
      <TasksCard>
        <TaskData sensorName='temperatureRtd' context={context} />
        <FormCard sensorName='temperatureRtd' context={context}>
          <Form
            taskNo='1'
            index={resistanceIndex}
            maxIndex={5}
            value={resistanceValue}
            isInvalid={resistanceHasError}
            errorMessage={resistanceError}
            isComplete={resistanceIndex === 5}
            handleChange={handleResistanceInputChange}
            handleSubmit={handleResistanceFormSubmit}
          />
          <Form
            taskNo='2'
            index={timeConstantIndex}
            maxIndex={3}
            value={timeConstantValue}
            isInvalid={timeConstantHasError}
            errorMessage={timeConstantError}
            isComplete={timeConstantIndex === 3}
            handleChange={handleTimeConstantInputChange}
            handleSubmit={handleTimeConstantFormSubmit}
          />
        </FormCard>
      </TasksCard>
      <ChartsCard>
        <ChartTabs tabsData={tabsData} />
      </ChartsCard>
    </Content>
  );
};
