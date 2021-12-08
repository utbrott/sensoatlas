import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { StrainContext } from '#store/strain-context';
import { useContext } from 'react';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';

export const StrainGauge = () => {
  const context = useContext(StrainContext);
  const { config } = context;
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
          onClick={() => window.alert(`Saved config:\n${JSON.stringify(context.config, null, 2)}`)}
        >
          Show config
        </Button>
      </Content>
    </>
  );
};
