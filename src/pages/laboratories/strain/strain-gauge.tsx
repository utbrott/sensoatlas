import { useState } from 'react'
import { Shell } from '@ui/layouts'
import {
  config,
  tasks,
  validation,
  Provider,
  useStore
} from '@store/strain-gauge'
import { Config } from '@atoms/config'
import { configFields } from '@data/laboratories/strain/strain-gauge'
import { Tasks } from '@atoms/tasks'
import { taskFields } from '@data/laboratories/strain/strain-gauge'
import { lineChartCreator } from '@atoms/chart'
import { LineChart } from '@atoms/chart'
import { Tab } from '@ui/tab-group'
import { getNewGaugeResistance } from '@data/index'

export default function StrainGauge() {
  const [isConfigSaved, setIsConfigSaved] = useState(false)
  const [tasksComplete, setTasksComplete] = useState(false)

  return (
    <Shell.App title='Laboratories | SensoAtlas'>
      <Provider>
        <div className='flex w-full justify-center'>
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
            <Charts unlocked={isConfigSaved} tasksComplete={tasksComplete} />
          </div>
        </div>
        <Debug />
      </Provider>
    </Shell.App>
  )
}

interface ChartsProps {
  unlocked: boolean
  tasksComplete: boolean
}

const Charts = ({ unlocked, tasksComplete }: ChartsProps) => {
  const [dataStore] = useStore((store: Record<string, number[]>) => store)
  const [configStore] = useStore(
    (store: Record<string, { [key: string]: string | number }>) => store
  )

  const chart1Data = lineChartCreator({
    xvalues: dataStore.data0,
    yvalues: dataStore.validation0
  })

  const chart2Data = lineChartCreator({
    xvalues: dataStore.data1,
    yvalues: dataStore.validation1
  })

  const chart3Data = lineChartCreator({
    xvalues: dataStore.data1,
    yvalues: getNewGaugeResistance({
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
  })

  return tasksComplete ? (
    <div className='flex h-full w-full flex-col space-y-4 rounded-md bg-gray-800 p-4'>
      <span className='font-medium'>Generated charts</span>
      <span>
        <Tab.Group>
          <Tab.List>
            <Tab>Task 1</Tab>
            <Tab>Task 2.1</Tab>
            <Tab>Task 2.2</Tab>
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
                  xaxis: 'Microstrains [\u00b5\u03b5]',
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
                  xaxis: 'Microstrains [\u00b5\u03b5]',
                  yaxis: 'Output voltage [mV]'
                }}
                hasDataPoints
                withTooltip
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </span>
    </div>
  ) : null
}

function Debug() {
  const [store] = useStore(store => store)

  console.log('in debug', store)

  return null
}
