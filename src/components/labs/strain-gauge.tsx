import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { LabsContext } from '#store/labs-context';
import { useContext } from 'react';
import { useToast } from '@chakra-ui/toast';
import { Task, TaskData, TaskForm } from '#components/task';

export const StrainGauge = () => {
  const context = useContext(LabsContext);
  const { config } = context.strain;
  const schematicImage = `/images/strain-${config.bridge}.png`;

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
    window.alert(
      `Saved config:\n${JSON.stringify(context.strain.config, null, 2)}`
    );
  };

  return (
    <>
      <Header heading='Strain gauge sensors' hasButton />
      <Subheader hasModal='Strain gauge sensors' />
      <Content>
        <Config
          sensorName='strain'
          context={context}
          isSaved={context.isConfigSaved}
          setIsSaved={handleConfigSave}
          imageSource={schematicImage}
        />
        <Task>
          <TaskData sensorName='strain' context={context} />
          <TaskForm />
        </Task>
      </Content>
    </>
  );
};
