import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { ReactElement } from 'react';
import Latex from 'react-latex';

type TabData = {
  tabTitle: string;
  chart: ReactElement;
};

type Props = {
  tabsData: TabData[];
};

export const ChartTabs = ({ tabsData }: Props) => {
  return (
    <Tabs isFitted>
      <TabList mb={2}>
        {tabsData.map((tab, index) => (
          <Tab key={index} fontSize='sm' _focus={{ outline: 'none' }}>
            <Latex>{tab.tabTitle}</Latex>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsData.map((tab, index) => (
          <TabPanel key={index} px={0} py={2}>
            {tab.chart}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
