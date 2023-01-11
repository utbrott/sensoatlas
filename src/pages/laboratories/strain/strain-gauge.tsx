import { useState, useEffect, useCallback } from 'react'
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

export default function StrainGauge() {
  const [isConfigSaved, setIsConfigSaved] = useState(false)

  return (
    <Shell.App title='Laboratories | SensoAtlas'>
      <Provider>
        <span className='flex space-x-4'>
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
          />
        </span>
        <Debug />
      </Provider>
    </Shell.App>
  )
}

function Debug() {
  const [store] = useStore(store => store)

  console.log('in debug', store)

  return null
}
