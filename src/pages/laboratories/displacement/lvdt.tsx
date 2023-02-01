import { useState } from 'react';
import { Shell } from '@ui/layouts';
import { config, tasks, validation, Provider, useStore } from '@store/lvdt';
import { Config } from '@atoms/config';
import { configFields, taskFields } from '@data/laboratories/displacement/lvdt';
import { Tasks } from '@atoms/tasks';
import { lineChartCreator } from '@atoms/chart';
import { LineChart } from '@atoms/chart';
import { Tab } from '@ui/tab-group';
import { SlideOver } from '@ui/slide-over';
import { PageHeader, Article } from '@data/laboratories/displacement/lvdt';
import { Button } from '@ui/button';

export default function Lvdt() {
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
          title='LVDTs'
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

  const chart1Data = lineChartCreator({
    xvalues: dataStore.data0,
    yvalues: [dataStore.validation0],
    withMirrorX: true
  });

  return tasksComplete ? (
    <div className='flex h-full w-full flex-col space-y-4 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Generated charts</span>
      <span>
        <Tab.Group>
          <Tab.List>
            <Tab>{'Task 1: Vout = f(x)'}</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <LineChart
                chartName='displacement-out-volt'
                chartData={chart1Data}
                labels={{
                  xaxis: 'Displacement [mm]',
                  yaxis: 'Output voltage [mV]'
                }}
                hasDataPoints
                withTooltip
                withZeroRef={{ x: 20 }}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </span>
    </div>
  ) : null;
};
