import { Shell } from '@ui/layout'
import { useState } from 'react'
import { Config } from '@atoms/config'
import { Button } from '@ui/button'
import { Provider, useStore } from '@store/strain-gauge'
import { configFields } from '@data/laboratories/strain/strain-gauge'

export default function StrainGauge() {
  const [isConfigSaved, setIsConfigSaved] = useState(false)

  return (
    <Shell.App title='Laboratories | SensoAtlas'>
      <Provider>
        <Config
          fields={configFields}
          useStore={useStore}
          disabled={isConfigSaved}
          configSaveHandler={() => setIsConfigSaved(true)}
        />
        <Debug />
      </Provider>
    </Shell.App>
  )
}

function Debug() {
  const [store] = useStore(store => store)
  console.log(store)

  return null
}
