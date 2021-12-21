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
import { ChartsCard, TaskChart } from '#components/chart';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useGenerateChartData } from '#hooks/use-generate-chart-data';

export const StrainGauge = () => {
  const context = useContext(LabsContext);
  const { config, validationData } = context.strain;
  const schematicImage = `/images/strain-${config.bridge.type}.png`;

  const { handleConfigSave } = useConfigSave();

  const {
    value: strainValue,
    index: strainIndex,
    isFieldEmpty: strainInputEmpty,
    isFieldInvalid: strainInputInvalid,
    handleChange: handleStrainInputChange,
    handleReset: resetStrainInput,
  } = useFormInput(validationData['0']);

  const {
    value: temperatureValue,
    index: temperatureIndex,
    isFieldEmpty: temperatureInputEmpty,
    isFieldInvalid: temperatureInputInvalid,
    handleChange: handleTemperatureInputChange,
    handleReset: resetTemperatureInput,
  } = useFormInput(validationData['1']);

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

  const { data: strainOutVoltage } = useGenerateChartData(
    context.strain,
    0,
    false
  );
  const { data: temperatureOutVoltage } = useGenerateChartData(
    context.strain,
    1,
    true
  );

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
          <Tabs isFitted>
            <TabList mb={2}>
              <Tab fontSize='sm' _focus={{ outline: 'none' }}>
                Task 1: Vout = f(ε)
              </Tab>
              <Tab fontSize='sm' _focus={{ outline: 'none' }}>
                Task 2: Vout = f(T)
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TaskChart
                  data={strainOutVoltage}
                  chartName='strain-out-voltage'
                  xlabel='Microstrains (με)'
                  ylabel='Output voltage (mV)'
                />
              </TabPanel>
              <TabPanel>
                <TaskChart
                  data={temperatureOutVoltage}
                  chartName='temperature-out-voltage'
                  xlabel='Temperature (deg C)'
                  ylabel='Output voltage (mV)'
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ChartsCard>
      </Content>
    </>
  );
};
