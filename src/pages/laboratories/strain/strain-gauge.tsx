import { useState } from 'react';
import { Shell } from '@ui/layouts';
import {
  config,
  tasks,
  validation,
  Provider,
  useStore
} from '@store/strain-gauge';
import { Config } from '@atoms/config';
import { configFields } from '@data/laboratories/strain/strain-gauge';
import { Tasks } from '@atoms/tasks';
import { taskFields } from '@data/laboratories/strain/strain-gauge';
import { lineChartCreator } from '@atoms/chart';
import { LineChart } from '@atoms/chart';
import { Tab } from '@ui/tab-group';
import { getNewGaugeResistance } from '@data/laboratories/strain/validation-data';
import { SlideOver } from '@ui/slide-over';
import { Article, PageHeader } from '@data/laboratories/strain/strain-gauge';
import { Button } from '@ui/button';

export default function StrainGauge() {
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
          title='Strain gauges'
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
  const [configStore] = useStore(
    (store: Record<string, { [key: string]: string | number }>) => store
  );

  const chart1Data = lineChartCreator({
    xvalues: dataStore.data0,
    yvalues: [dataStore.validation0]
  });

  const chart2Data = lineChartCreator({
    xvalues: dataStore.data1,
    yvalues: [dataStore.validation1]
  });

  const chart3Data = lineChartCreator({
    xvalues: dataStore.data1,
    yvalues: [
      getNewGaugeResistance({
        material: {
          gaugeFactor: Number(configStore.material.gaugeFactor),
          modulus: Number(configStore.material.modulus),
          tempCoeff: Number(configStore.material.tempCoeff)
        },
        resistance: Number(configStore.resistance.resistance),
        bridge: {
          name: String(configStore.bridge.name),
          multiplier: Number(configStore.bridge.multiplier)
        },
        taskData: dataStore.data1
      })
    ]
  });

  return tasksComplete ? (
    <div className='flex h-full w-full flex-col space-y-4 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Generated charts</span>
      <span>
        <Tab.Group>
          <Tab.List>
            <Tab>{'Task 1: Vout = f(\u03b5)'}</Tab>
            <Tab>{'Task 2.1: Vout = f(T)'}</Tab>
            <Tab>{'Task 2.2: R = f(T)'}</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <LineChart
                chartName='strain-out-volt'
                chartData={chart1Data}
                labels={{
                  xaxis: 'Microstrains [\u00b5\u03b5]',
                  yaxis: 'Output voltage [mV]'
                }}
                hasDataPoints
                withTooltip
              />
            </Tab.Panel>
            <Tab.Panel>
              <LineChart
                chartName='temperature-out-voltage'
                chartData={chart2Data}
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
                chartName='temperature-resistance'
                chartData={chart3Data}
                labels={{
                  xaxis: 'Temperature [\u00b0C]',
                  yaxis: 'Resistance [\u03a9]'
                }}
                hasDataPoints
                withTooltip
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </span>
    </div>
  ) : null;
};
