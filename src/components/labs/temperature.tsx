import { useState } from 'react';
import { Header } from '@components/header';
import { Subheader } from '@components/subheader';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
} from '@chakra-ui/react';
import { Theory, Formula, Table } from '@components/theory';
import {
  temperatureRtdTheory,
  temperatureCoupleTheory,
} from '@data/theory-formulas';
import {
  rtdSensorTable,
  thermocoupleSensorTable,
  fillerMaterialTable,
} from '@data/theory-tables';
import { RTDSensor, ThermocoupleSensor } from '@components/labs';

export const Temperature = () => {
  const [sensorType, setSensorType] = useState('');

  const modalContent = (
    <Theory>
      <Formula
        data={
          sensorType == 'RTD' ? temperatureRtdTheory : temperatureCoupleTheory
        }
      />
      <Table
        data={sensorType == 'RTD' ? rtdSensorTable : thermocoupleSensorTable}
      />
      <Table data={fillerMaterialTable} />
    </Theory>
  );

  return (
    <>
      <Header heading='Temperature sensors: RTD, Thermocouple' />
      <Subheader
        hasModal={`${sensorType} temperature sensor`}
        isModalDisabled={sensorType === ''}
        modalContent={modalContent}
        hasSelect
        selectOnChange={(event) => setSensorType(event.currentTarget.value)}
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
      {sensorType === 'RTD' && <RTDSensor />}
      {sensorType === 'Thermocouple' && <ThermocoupleSensor />}
    </>
  );
};
