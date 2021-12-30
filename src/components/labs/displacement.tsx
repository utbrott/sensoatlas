import React, { useContext } from 'react';
import { LabsContext } from '#store/labs-context';
import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Theory, Formula } from '#components/theory';
import { displacementTheory } from '#data/theory-formulas';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { useConfigSave } from '#hooks/use-config-save';
import { TasksCard, TaskData, FormCard, Form } from '#components/task';
import { useFormInput } from '#hooks/use-form-input';
import { useFormValidation } from '#hooks/use-form-validation';
import { useCompleteTask } from '#hooks/use-complete-task';
import { ChartsCard, SingleLineChart, ChartTabs } from '#components/chart';
import { useSingleLineChartData, useMirrorValues } from '#hooks/use-chart-data';

export const Displacement = () => {
  const context = useContext(LabsContext);
  const { taskData, validationData } = context.displacement;
  const schematicImage = `/images/displacement-lvdt.png`;

  const { handleConfigSave } = useConfigSave();

  const modalContent = (
    <Theory>
      <Formula data={displacementTheory} />
    </Theory>
  );

  const {
    value: displacementValue,
    index: displacementIndex,
    isFieldEmpty: displacementInputEmpty,
    isFieldInvalid: displacementInputInvalid,
    handleChange: handleDisplacementInputChange,
    handleReset: resetDisplacementInput,
  } = useFormInput(validationData['0'], 'task1');

  const {
    hasError: displacementHasError,
    error: displacementError,
    handleSubmit: handleDisplacementFormSubmit,
  } = useFormValidation(
    displacementInputEmpty,
    displacementInputInvalid,
    resetDisplacementInput
  );

  useCompleteTask(displacementIndex === 5);

  const { data: displacementOutVoltageSingle } = useSingleLineChartData({
    input1: taskData['0'],
    input2: validationData['0'],
  });

  const { data: displacementOutVoltage } = useMirrorValues({
    input: displacementOutVoltageSingle,
  });

  console.log(displacementOutVoltage);

  const tabsData = [
    {
      tabTitle: 'Task 1: Vout = f(x)',
      chart: (
        <SingleLineChart
          data={displacementOutVoltage}
          chartName='displacement-out-voltage'
          xlabel='Displacement [mm]'
          ylabel='Output voltage [mV]'
          withZeroReference
        />
      ),
    },
  ];

  return (
    <>
      <Header heading='Displacement sensors: LVDT' hasButton />
      <Subheader
        hasModal='LVDT (Linear Variable Differential Transformer)'
        modalContent={modalContent}
      />
      <Content>
        <Config
          sensorName='displacement'
          context={context}
          setIsSaved={handleConfigSave}
          imageSource={schematicImage}
        />
        <TasksCard>
          <TaskData sensorName='displacement' context={context} />
          <FormCard sensorName='displacement' context={context}>
            <Form
              taskNo='1'
              index={displacementIndex}
              maxIndex={5}
              value={displacementValue}
              isInvalid={displacementHasError}
              errorMessage={displacementError}
              isComplete={displacementIndex === 5}
              handleChange={handleDisplacementInputChange}
              handleSubmit={handleDisplacementFormSubmit}
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
