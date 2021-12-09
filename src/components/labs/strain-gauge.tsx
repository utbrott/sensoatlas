import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { LabsContext } from '#store/labs-context';
import { useContext } from 'react';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';

export const StrainGauge = () => {
  const context = useContext(LabsContext);
  const { strain } = context.config;
  const schematicImage = `/images/strain-${strain.bridge}.png`;

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
          context={context}
          isSaved={context.isConfigSaved}
          setIsSaved={handleConfigSave}
          imageSource={schematicImage}
        />
        <Button
          size='sm'
          onClick={() =>
            window.alert(`Saved config:\n${JSON.stringify(context.config.strain, null, 2)}`)
          }
        >
          Show config
        </Button>
      </Content>
    </>
  );
};
