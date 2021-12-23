import { Header } from '#components/header';
import { Subheader } from '#components/subheader';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
} from '@chakra-ui/react';
import { RTDSensor, ThermocoupleSensor } from '#components/labs';

export const Temperature = () => {
  return (
    <>
      <Header heading='Temperature sensors: RTD, Thermocouple' hasButton />
      <Subheader hasModal='Temperature sensors: RTD, Thermocouple' />
      <VStack w='full' flex={1} align='stretch'>
        <Tabs isFitted h='full' flex={1} overflowY='hidden' pt={1}>
          <TabList>
            <Tab _focus={{ outline: 'none' }}>
              RTD: Resistance Temperature Detector
            </Tab>
            <Tab _focus={{ outline: 'none' }}>Thermocouple</Tab>
          </TabList>
          <TabPanels h='full'>
            <TabPanel p={0} pb={10} pt={2} h='full' flex={1}>
              <VStack h='full' flex={1}>
                <RTDSensor />
              </VStack>
            </TabPanel>
            <TabPanel p={0} pb={10} pt={2} h='full' flex={1}>
              <VStack h='full' flex={1}>
                <ThermocoupleSensor />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
};
