import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { LabsContext } from '#store/labs-context';
import { useContext } from 'react';
import { useToast } from '@chakra-ui/toast';
import { Task, TaskData, FormPanel } from '#components/task';

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
          <FormPanel sensorName='strain' context={context}></FormPanel>
        </Task>
      </Content>
    </>
  );
};
