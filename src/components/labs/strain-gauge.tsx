import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { LabsContext } from '#store/labs-context';
import { useContext, useState, useRef } from 'react';
import { useToast } from '@chakra-ui/toast';
import { Task, TaskData, FormPanel, Form } from '#components/task';
import { VStack } from '@chakra-ui/react';

type AnswerType = number | undefined;

export const StrainGauge = () => {
  const context = useContext(LabsContext);
  const { config } = context.strain;
  const schematicImage = `/images/strain-${config.bridge.type}.png`;

  const toast = useToast();
  const handleConfigSave = () => {
    context.saveConfig();
    toast({
      description: 'Configuration saved',
      status: 'success',
      isClosable: false,
      position: 'top',
      duration: 3000,
    });
  };

  const strainIndexRef = useRef(0);
  const tempIndexRef = useRef(0);

  let strainValidation: number[] = [];
  let tempValidation: number[] = [];

  if (context.isValidationAvailable) {
    strainValidation = context.strain.validationData['0'];
    tempValidation = context.strain.validationData['1'];
  }

  const strainRef = useRef(undefined);
  const handleStrainFormUpdate = (e: any) => {
    strainRef.current = e.currentTarget.value;
  };

  const tempRef = useRef(undefined);
  const handleTempFormUpdate = (e: any) => {
    tempRef.current = e.currentTarget.value;
  };

  const handleStrainFormSubmit = (e: any) => {
    e.preventDefault();
    let error = '';
    if (!strainRef.current) {
      error = 'Answer is required.';
      alert(error);
      return;
    }
    strainIndexRef.current++;
    console.log(strainIndexRef.current);
    alert(`Entered value: ${strainRef.current}`);
  };

  const handleTempFormSubmit = (e: any) => {
    e.preventDefault();
    alert(`Entered value: ${tempRef.current}`);
  };

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
              isInvalid={false}
              isDisabled={strainIndexRef.current === 5}
              handleSubmit={handleStrainFormSubmit}
              handleChange={handleStrainFormUpdate}
            />
            <Form
              taskNo='2'
              isInvalid={false}
              isDisabled={tempIndexRef.current === 5}
              handleSubmit={handleTempFormSubmit}
              handleChange={handleTempFormUpdate}
            />
          </FormPanel>
        </Task>
      </Content>
    </>
  );
};
