import { useState } from 'react';
import { Shell } from '@ui/layouts';
import {
  config,
  tasks,
  validation,
  Provider,
  useStore
} from '@store/thermocouple';
import {
  configFields,
  taskFields
} from '@data/laboratories/temperature/thermocouple';
import { Config } from '@atoms/config';
import { Tasks } from '@atoms/tasks';
import { lineChartCreator } from '@atoms/chart';
import { LineChart } from '@atoms/chart';
import { Tab } from '@ui/tab-group';
import { SlideOver } from '@ui/slide-over';
import {
  PageHeader,
  Article
} from '@data/laboratories/temperature/thermocouple';
import { Button } from '@ui/button';
import { getTemperatureSlopes } from '@data/index';

export default function Thermocouple() {
  const [isConfigSaved, setIsConfigSaved] = useState(false);
  const [tasksComplete, setTasksComplete] = useState(false);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  return (
    <Shell.App title='Laboratories | SensoAtlas'>
      <Provider>
        <div className='flex w-full max-w-3xl flex-col content-center justify-center space-y-4'>
          <div className='flex h-full w-full flex-col space-y-4 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
            <PageHeader />
            <Button onClick={() => setIsSlideOverOpen(true)}>
              View theory
            </Button>
          </div>
          <div className='flex max-w-3xl flex-col content-center space-y-4'>
            <div className='flex justify-center space-x-4'>
              <Config
                initial={config}
                fields={configFields}
                useStore={useStore}
                disabled={isConfigSaved}
                configSaveHandler={() => setIsConfigSaved(true)}
              />
              <Tasks
                initialTasks={tasks}
                initialValidation={validation}
                fields={taskFields}
                useStore={useStore}
                unlocked={isConfigSaved}
                completionHandler={setTasksComplete}
              />
            </div>
            <Charts tasksComplete={tasksComplete} />
          </div>
        </div>
        <SlideOver
          isOpen={isSlideOverOpen}
          title='Thermocouples'
          closeHandler={() => setIsSlideOverOpen(false)}
        >
          <Article />
        </SlideOver>
      </Provider>
    </Shell.App>
  );
}

interface ChartsProps {
  tasksComplete: boolean;
}

const Charts = ({ tasksComplete }: ChartsProps) => {
  const [dataStore] = useStore((store: Record<string, number[]>) => store);

  const { xvalue: xvalues, yvalues } = getTemperatureSlopes({
    sensor: 'rtd',
    timeConstantValues: dataStore.validation1
  });

  const chart1Data = lineChartCreator({
    xvalues: dataStore.data0,
    yvalues: [dataStore.validation0]
  });

  const chart2Data = lineChartCreator({ xvalues, yvalues });

  return tasksComplete ? (
    <div className='flex h-full w-full flex-col space-y-4 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Generated charts</span>
      <span>
        <Tab.Group>
          <Tab.List>
            <Tab>{'Task 1: Static characteristic,  Vout = f(T)'}</Tab>
            <Tab>{'Task 2: Dynamic characteristic, T = f(t)'}</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <LineChart
                chartName='thermocouple-static'
                chartData={chart1Data}
                labels={{
                  xaxis: 'Temperature [\u00b0C]',
                  yaxis: 'Output voltage [mV]'
                }}
                hasDataPoints
                withTooltip
              />
            </Tab.Panel>
            <Tab.Panel>
              <LineChart
                chartName='thermocouple-dynamic'
                chartData={chart2Data}
                labels={{
                  xaxis: 'Time [ms]',
                  yaxis: 'Temperature [\u00b0C]'
                }}
                withTooltip
                legend={['Bare sensor', 'Sheathed', 'Inside thermowell']}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </span>
    </div>
  ) : null;
};
