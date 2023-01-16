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

// const Lab = () => {
//   const [labState, dispatch] = useReducer(labStateReducer, initialLabState)
//   return
// }

export default function StrainGauge() {
  const [isConfigSaved, setIsConfigSaved] = useState(false)
  const [tasksComplete, setTasksComplete] = useState(false)

  console.log('tasks complete', tasksComplete)

  return (
    <Shell.App title='Laboratories | SensoAtlas'>
      <Provider>
        <div className='flex max-w-3xl flex-col space-y-4'>
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
          <div className='w-full max-w-full'>{isConfigSaved && <Charts />}</div>
        </div>
        <Debug />
      </Provider>
    </Shell.App>
  )
}

interface Charts {}

const Charts = () => {
  const [store] = useStore((store: Record<string, number[]>) => store)

  const chartData = lineChartCreator({
    xvalues: store.data0,
    yvalues: store.validation0
  })

  console.log('chartdata', chartData)

  return chartData.length > 0 ? (
    <div>
      <LineChart
        chartName='strain-out-volt'
        chartData={chartData}
        labels={{
          xaxis: 'Microstrains [\u00b5\u03b5]',
          yaxis: 'Output voltage [mV]'
        }}
      />
    </div>
  ) : null
}

function Debug() {
  const [store] = useStore(store => store)

  console.log('in debug', store)

  return null
}
