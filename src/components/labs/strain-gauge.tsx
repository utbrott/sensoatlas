import React, { useContext } from 'react';
import { LabsContext } from '#store/labs-context';
import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { useConfigSave } from '#hooks/use-config-save';
import { TasksCard, TaskData, FormCard, Form } from '#components/task';
import { useFormInput } from '#hooks/use-form-input';
import { useFormValidation } from '#hooks/use-form-validation';
import { useCompleteTask } from '#hooks/use-complete-task';
import { ChartsCard, TaskChart, ChartTabs } from '#components/chart';
import { useGenerateChartData } from '#hooks/use-generate-chart-data';
import { strainGaugeNewResistance } from '#utils/generate-strain-data';

export const StrainGauge = () => {
  const context = useContext(LabsContext);
  const { config, taskData, validationData } = context.strain;
  const schematicImage = `/images/strain-${config.bridge.type}.png`;

  const { handleConfigSave } = useConfigSave();

  const {
    value: strainValue,
    index: strainIndex,
    isFieldEmpty: strainInputEmpty,
    isFieldInvalid: strainInputInvalid,
    handleChange: handleStrainInputChange,
    handleReset: resetStrainInput,
  } = useFormInput(validationData['0'], 'task1');

  const {
    value: temperatureValue,
    index: temperatureIndex,
    isFieldEmpty: temperatureInputEmpty,
    isFieldInvalid: temperatureInputInvalid,
    handleChange: handleTemperatureInputChange,
    handleReset: resetTemperatureInput,
  } = useFormInput(validationData['1'], 'task2');

  const {
    hasError: strainHasError,
    error: strainError,
    handleSubmit: handleStrainFormSubmit,
  } = useFormValidation(strainInputEmpty, strainInputInvalid, resetStrainInput);

  const {
    hasError: temperatureHasError,
    error: temperatureError,
    handleSubmit: handleTemperatureFormSubmit,
  } = useFormValidation(
    temperatureInputEmpty,
    temperatureInputInvalid,
    resetTemperatureInput
  );

  useCompleteTask(strainIndex === 5 && temperatureIndex === 5);

  const { data: strainOutVoltage } = useGenerateChartData({
    input1: taskData['0'],
    input2: validationData['0'],
    withSorting: false,
  });

  const { data: temperatureOutVoltage } = useGenerateChartData({
    input1: taskData['1'],
    input2: validationData['1'],
    withSorting: true,
  });

  const bonusGraphData = strainGaugeNewResistance(context);
  const { data: temperatureResistance } = useGenerateChartData({
    input1: taskData['1'],
    input2: bonusGraphData,
    withSorting: true,
  });

  const tabs = [
    {
      tabTitle: 'Task 1: Vout = f($\\varepsilon$)',
      chart: (
        <TaskChart
          data={strainOutVoltage}
          chartName='strain-out-voltage'
          xlabel='Microstrains (με)'
          ylabel='Output voltage (mV)'
        />
      ),
    },
    {
      tabTitle: 'Task 2.1: Vout = f(T)',
      chart: (
        <TaskChart
          data={temperatureOutVoltage}
          chartName='temperature-out-voltage'
          xlabel='Temperature (°C)'
          ylabel='Output voltage (mV)'
          withAutoDomain
        />
      ),
    },
    {
      tabTitle: 'Task 2.2: R = f(T)',
      chart: (
        <TaskChart
          data={temperatureResistance}
          chartName='temperature-resistance'
          xlabel='Temperature (°C)'
          ylabel='Resistance (Ω)'
          withAutoDomain
        />
      ),
    },
  ];

  return (
    <>
      <Header heading='Strain gauge sensors' hasButton />
      <Subheader hasModal='Strain gauge sensors' />
      <Content>
        <Config
          sensorName='strain'
          context={context}
          setIsSaved={handleConfigSave}
          imageSource={schematicImage}
        />
        <TasksCard>
          <TaskData sensorName='strain' context={context} />
          <FormCard sensorName='strain' context={context}>
            <Form
              taskNo='1'
              index={strainIndex}
              value={strainValue}
              isInvalid={strainHasError}
              errorMessage={strainError}
              isComplete={strainIndex === 5}
              handleChange={handleStrainInputChange}
              handleSubmit={handleStrainFormSubmit}
            />
            <Form
              taskNo='2'
              index={temperatureIndex}
              value={temperatureValue}
              isInvalid={temperatureHasError}
              errorMessage={temperatureError}
              isComplete={temperatureIndex === 5}
              handleChange={handleTemperatureInputChange}
              handleSubmit={handleTemperatureFormSubmit}
            />
          </FormCard>
        </TasksCard>
        <ChartsCard>
          <ChartTabs tabsData={tabs} />
        </ChartsCard>
      </Content>
    </>
  );
};
