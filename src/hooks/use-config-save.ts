import { useContext } from 'react';
import { LabsContext } from '@store/labs-context';
import { useToast } from '@chakra-ui/react';

export const useConfigSave = () => {
  const context = useContext(LabsContext);
  const toast = useToast();

  const handleConfigSave = () => {
    context.saveConfig();
    toast({
      description: 'Sensor configuration has been saved.',
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: false,
    });
  };

  return { handleConfigSave };
};
