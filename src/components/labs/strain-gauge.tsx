import React, { useContext } from 'react';
import { LabsContext } from '#store/labs-context';
import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Theory, Formula, Table } from '#components/theory';
import { strainTheory } from '#data/theory-formulas';
import { strainSensorTable } from '#data/theory-tables';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { useConfigSave } from '#hooks/use-config-save';
import { TasksCard, TaskData, FormCard, Form } from '#components/task';
import { useFormInput } from '#hooks/use-form-input';
import { useFormValidation } from '#hooks/use-form-validation';
import { useCompleteTask } from '#hooks/use-complete-task';
import { ChartsCard, SingleLineChart, ChartTabs } from '#components/chart';
import { useSingleLineChartData } from '#hooks/use-chart-data';
import { strainGaugeNewResistance } from '#utils/generate-strain-lab-data';

export const StrainGauge = () => {
  const context = useContext(LabsContext);
  const { config, taskData, validationData } = context.strain;
  const schematicImage = `/images/strain-${config.bridge.type}.png`;

  const { handleConfigSave } = useConfigSave();

  const modalContent = (
    <Theory>
      <Formula data={strainTheory} />
      <Table data={strainSensorTable} />
    </Theory>
  );

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

  const { data: strainOutVoltage } = useSingleLineChartData({
    input1: taskData['0'],
    input2: validationData['0'],
  });

  const { data: temperatureOutVoltage } = useSingleLineChartData({
    input1: taskData['1'],
    input2: validationData['1'],
  });

  const bonusGraphData = strainGaugeNewResistance(context);
  const { data: temperatureResistance } = useSingleLineChartData({
    input1: taskData['1'],
    input2: bonusGraphData,
  });

  const tabsData = [
    {
      tabTitle: 'Task 1: Vout = f($\\varepsilon$)',
      chart: (
        <SingleLineChart
          data={strainOutVoltage}
          chartName='strain-out-voltage'
          xlabel='Microstrains [με]'
          ylabel='Output voltage [mV]'
        />
      ),
    },
    {
      tabTitle: 'Task 2.1: Vout = f(T)',
      chart: (
        <SingleLineChart
          data={temperatureOutVoltage}
          chartName='temperature-out-voltage'
          xlabel='Temperature [°C]'
          ylabel='Output voltage [mV]'
          withAutoDomain
        />
      ),
    },
    {
      tabTitle: 'Task 2.2: R = f(T)',
      chart: (
        <SingleLineChart
          data={temperatureResistance}
          chartName='temperature-resistance'
          xlabel='Temperature [°C]'
          ylabel='Resistance [Ω]'
          withAutoDomain
        />
      ),
    },
  ];

  return (
    <>
      <Header heading='Strain gauge sensors' hasButton />
      <Subheader hasModal='Strain gauge sensors' modalContent={modalContent} />
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
              maxIndex={5}
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
              maxIndex={5}
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
          <ChartTabs tabsData={tabsData} />
        </ChartsCard>
      </Content>
    </>
  );
};
