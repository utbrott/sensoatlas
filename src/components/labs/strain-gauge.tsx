import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import { Content } from '#components/content';
import { Config } from '#components/config';
import { StrainContext } from '#store/strain-context';
import { useContext, useState } from 'react';
import { Button } from '@chakra-ui/button';

export const StrainGauge = () => {
  const configContext = useContext(StrainContext);
  const schematicImage = `/images/strain-${configContext.config.bridge}.png`;

  const [isConfigSaved, setIsConfigSaved] = useState(false);
  const handleConfigSave = () => {
    setIsConfigSaved(true);
  };

  return (
    <>
      <Header heading='Strain gauge sensors' hasButton />
      <Subheader hasModal='Strain gauge sensors' />
      <Content>
        <Config
          context={configContext}
          isSaved={isConfigSaved}
          setIsSaved={handleConfigSave}
          imageSource={schematicImage}
        />
        <Button onClick={() => window.alert(JSON.stringify(configContext, null, 2))} />
      </Content>
    </>
  );
};
