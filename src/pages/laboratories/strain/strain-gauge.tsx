import { Head, Header } from '@ui/layout'
import { useState } from 'react'
import { Config } from '@atoms/config'
import { Button } from '@ui/button'
import createConfigContext from '@hooks/create-config-context'
import { configFields } from '@data/laboratories/strain/strain-gauge'
import { SchematicImage } from '@atoms/schematic-image'

export type InitialConfigType = Record<
  string,
  { [key: string]: string | number }
>

export default function StrainGauge() {
  const initialConfig: InitialConfigType = {}

  configFields.map(field => {
    const option = field.options.find(opt => opt.name === field.options[0].name)
    return (initialConfig[field.id] = option)
  })
  const { Provider, useStore } = createConfigContext(initialConfig)
  const [configSaved, setConfigSaved] = useState(false)
  return (
    <>
      <Head title='Sandbox | SensoAtlas' />
      <Header />
      <div className='p-2'>
        <div className='flex w-full flex-col items-center justify-center gap-2 bg-gray-100 p-4 dark:bg-gray-800'>
          <div className='w-96 space-y-2'>
            <Provider>
              <div className='mb-2'>Configuration</div>
              <Config
                config={initialConfig}
                configFields={configFields}
                useStore={useStore}
                isSaved={configSaved}
              />
              <div className=''>Schematic</div>
              <SchematicImage useStore={useStore} />
            </Provider>
            <Button fullWidth onClick={() => setConfigSaved(true)}>
              Save config
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
