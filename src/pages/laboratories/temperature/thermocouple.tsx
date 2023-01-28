import { useState } from 'react'
import { Shell } from '@ui/layouts'
import { config, tasks, validation, Provider, useStore } from '@store/rtd'
import {
  configFields,
  taskFields
} from '@data/laboratories/temperature/thermocouple'
import { Config } from '@atoms/config'
import { Tasks } from '@atoms/tasks'
import { lineChartCreator } from '@atoms/chart'
import { LineChart } from '@atoms/chart'
import { Tab } from '@ui/tab-group'
import { SlideOver } from '@ui/slide-over'
import {
  ThermocouplePageHeader,
  ThermocoupleArticle
} from '@data/laboratories/temperature/thermocouple'
import { Button } from '@ui/button'

export default function Thermocouple() {
  const [isConfigSaved, setIsConfigSaved] = useState(false)
  const [tasksComplete, setTasksComplete] = useState(false)
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)

  return (
    <Shell.App title='Laboratories | SensoAtlas'>
      <Provider>
        <div className='flex w-full max-w-3xl flex-col content-center justify-center space-y-4'>
          <div className='flex h-full w-full flex-col space-y-4 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
            <ThermocouplePageHeader />
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
            {/* <Charts tasksComplete={tasksComplete} /> */}
          </div>
        </div>
        <SlideOver
          isOpen={isSlideOverOpen}
          title='Strain gauges'
          closeHandler={() => setIsSlideOverOpen(false)}
        >
          <ThermocoupleArticle />
        </SlideOver>
      </Provider>
    </Shell.App>
  )
}
