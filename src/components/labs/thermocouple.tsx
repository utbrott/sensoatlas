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

export const ThermocoupleSensor = () => {
  const context = useContext(LabsContext);
  const { taskData, validationData } = context.temperatureCouple;
  const schematicImage = `/images/temperature-thermocouple.png`;

  const { handleConfigSave } = useConfigSave();

  const {
    value: outVoltageValue,
    index: outVoltageIndex,
    isFieldEmpty: outVoltageInputEmpty,
    isFieldInvalid: outVoltageInputInvalid,
    handleChange: handleOutVoltageInputChange,
    handleReset: resetOutVoltageInput,
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
    hasError: outVoltageHasError,
    error: outVoltageError,
    handleSubmit: handleOutVoltageFormSubmit,
  } = useFormValidation(
    outVoltageInputEmpty,
    outVoltageInputInvalid,
    resetOutVoltageInput
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

  useCompleteTask(outVoltageIndex === 5 && timeConstantIndex === 3);

  const { data: temperatureOutVoltage } = useSingleLineChartData({
    input1: taskData['0'],
    input2: validationData['0'],
  });

  const timeTemperatureCouple = generateTemperatureSlope({
    sensorType: 'thermocouple',
    tauValuesArray: validationData['1'],
  });

  const tabsData = [
    {
      tabTitle: 'Task 1: Static Thermocouple characteristic',
      chart: (
        <SingleLineChart
          data={temperatureOutVoltage}
          chartName='temperature-out-voltage'
          xlabel='Temperature [°C]'
          ylabel='Output Voltage [mV]'
        />
      ),
    },
    {
      tabTitle: 'Task 2: Dynamic Thermocouple characteristic',
      chart: (
        <MultiLineChart
          data={timeTemperatureCouple}
          chartName='time-temperature-thermocouple'
          xlabel='Time [s]'
          ylabel='Temperature [°C]'
        />
      ),
    },
  ];

  return (
    <Content>
      <Config
        sensorName='temperatureCouple'
        context={context}
        setIsSaved={handleConfigSave}
        imageSource={schematicImage}
      />
      <TasksCard>
        <TaskData sensorName='temperatureCouple' context={context} />
        <FormCard sensorName='temperatureCouple' context={context}>
          <Form
            taskNo='1'
            index={outVoltageIndex}
            maxIndex={5}
            value={outVoltageValue}
            isInvalid={outVoltageHasError}
            errorMessage={outVoltageError}
            isComplete={outVoltageIndex === 5}
            handleChange={handleOutVoltageInputChange}
            handleSubmit={handleOutVoltageFormSubmit}
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
