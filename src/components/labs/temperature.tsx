import { useState } from 'react';
import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
} from '@chakra-ui/react';
import { RTDSensor, ThermocoupleSensor } from '#components/labs';

export const Temperature = () => {
  const [sensorType, setSensorType] = useState('');

  return (
    <>
      <Header heading='Temperature sensors: RTD, Thermocouple' hasButton />
      <Subheader
        hasModal='Temperature sensors: RTD, Thermocouple'
        hasSelect
        selectOnChange={event => setSensorType(event.currentTarget.value)}
      />
      {sensorType === '' && (
        <VStack p={10} flex={1} w='full'>
          <Alert status='warning' rounded='md' py={1} mx={10}>
            <AlertIcon />
            <VStack flex={1} spacing={0} align='flex-start'>
              <AlertTitle fontSize='md'>No sensor type selected</AlertTitle>
              <AlertDescription fontSize='sm'>
                Please choose a sensor type from dropdown above to begin.
              </AlertDescription>
            </VStack>
          </Alert>
        </VStack>
      )}
      {sensorType === 'rtd' && <RTDSensor />}
      {sensorType === 'thermocouple' && <ThermocoupleSensor />}
    </>
  );
};
