import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { LabsContext } from '#store/labs-context';
import React, { useContext } from 'react';
import { Task, TaskData, FormPanel, Form } from '#components/task';
import { useConfigSave } from '#hooks/use-config-save';
import { useFormInput } from '#hooks/use-form-input';
import { useFormValidation } from '#hooks/use-form-validation';

// TODO: Add tracking of task completition (New field in context)
// TODO: Add showing of graph on task completition (Read all complete from context)

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

  console.log(validationData['0'], validationData['1']);

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
        <Task>
          <TaskData sensorName='strain' context={context} />
          <FormPanel sensorName='strain' context={context}>
            <Form
              taskNo='1'
              value={strainValue}
              isInvalid={strainHasError}
              errorMessage={strainError}
              isComplete={strainIndex === 5}
              handleChange={handleStrainInputChange}
              handleSubmit={handleStrainFormSubmit}
            />
            <Form
              taskNo='1'
              value={temperatureValue}
              isInvalid={temperatureHasError}
              errorMessage={temperatureError}
              isComplete={temperatureIndex === 5}
              handleChange={handleTemperatureInputChange}
              handleSubmit={handleTemperatureFormSubmit}
            />
          </FormPanel>
        </Task>
      </Content>
    </>
  );
};
