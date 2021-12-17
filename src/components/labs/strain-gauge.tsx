import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { LabsContext } from '#store/labs-context';
import { useContext, useState, useRef, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import { Task, TaskData, FormPanel, Form } from '#components/task';

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

  const strainRef = useRef(undefined);
  const strainValidation = useRef<number[]>([]);
  const [strainIndex, setStrainIndex] = useState<number>(0);
  const [strainError, setStrainError] = useState<string>('');

  const tempRef = useRef(undefined);
  const tempValidation = useRef<number[]>([]);
  const [tempIndex, setTempIndex] = useState<number>(0);
  const [tempError, setTempError] = useState<string>('');

  const { validationData } = context.strain;
  useEffect(() => {
    if (context.isValidationAvailable) {
      strainValidation.current = validationData['0'];
      tempValidation.current = validationData['1'];
      console.log(strainValidation.current, tempValidation.current);
    }
  }, [context.isValidationAvailable, validationData]);

  const handleStrainFormUpdate = (e: any) => {
    strainRef.current = e.currentTarget.value;
    setStrainError('');
  };

  const handleTempFormUpdate = (e: any) => {
    tempRef.current = e.currentTarget.value;
    setTempError('');
  };

  const handleStrainFormSubmit = (e: any) => {
    e.preventDefault();
    let strainInput = strainRef.current;
    if (!strainInput) return setStrainError('Answer is required');
    if (parseFloat(strainInput) !== strainValidation.current[strainIndex]) {
      return setStrainError('Not correct, verify your answer');
    }
    setStrainIndex(strainIndex => strainIndex + 1);
    console.log(strainInput);
  };

  const handleTempFormSubmit = (e: any) => {
    e.preventDefault();
    let tempInput = tempRef.current;
    if (!tempInput) return setTempError('Answer is required');
    if (parseFloat(tempInput) !== tempValidation.current[tempIndex]) {
      return setTempError('Not correct, verify your answer');
    }
    setTempIndex(tempIndex => tempIndex + 1);
    console.log(tempInput);
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
              isInvalid={strainError !== '' ? true : false}
              errorString={strainError}
              isDisabled={strainIndex === 5 ? true : false}
              handleSubmit={handleStrainFormSubmit}
              handleChange={handleStrainFormUpdate}
            />
            <Form
              taskNo='2'
              isInvalid={tempError !== '' ? true : false}
              errorString={strainError}
              isDisabled={tempIndex === 5 ? true : false}
              handleSubmit={handleTempFormSubmit}
              handleChange={handleTempFormUpdate}
            />
          </FormPanel>
        </Task>
      </Content>
    </>
  );
};
