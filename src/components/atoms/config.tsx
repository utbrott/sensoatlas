import { Select } from '@ui/select'
import { RadioGroup } from '@ui/radio-group'
import { Button } from '@ui/button'
import { SchematicImage } from './schematic-image'
import { useRouter } from 'next/router'
import { ConfigItem } from '@utils/configuration'
import { useGetImagePath } from '@hooks/use-get-image-path'
import { getFieldById, getFieldOption } from '@utils/configuration'

export type ConfigKeys = Record<string, { [key: string]: string | number }>

interface ConfigFieldProps {
  name: string
  fields: ConfigItem[]
  useStore: any
  disabled?: boolean
}

const ConfigField = ({
  name,
  fields,
  useStore,
  disabled
}: ConfigFieldProps) => {
  const [fieldValue, setStore] = useStore((store: ConfigKeys) => store[name])
  const field = getFieldById(fields, name)

  if (field.type === 'select') {
    return (
      <Select
        value={fieldValue.name}
        onChange={value => setStore({ [name]: getFieldOption(field, value) })}
        label={field.label}
        disabled={disabled}
        fullWidth
      >
        {field.options.map((option, index) => {
          return (
            <Select.Option value={option.name} key={index}>
              {option.name}
            </Select.Option>
          )
        })}
      </Select>
    )
  }

  return (
    <RadioGroup
      value={fieldValue.name}
      onChange={value => setStore({ [name]: getFieldOption(field, value) })}
      disabled={disabled}
      label={field.label}
    >
      {field.options.map((option, index) => {
        return (
          <RadioGroup.Option value={option.name} key={index}>
            {option.name}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>
  )
}

interface Props {
  initial: ConfigKeys
  fields: ConfigItem[]
  useStore: any
  disabled?: boolean
  configSaveHandler: () => void
}

export const Config = ({
  initial,
  fields,
  useStore,
  disabled,
  configSaveHandler
}: Props) => {
  const { reload, asPath } = useRouter()

  const [store] = useStore((store: ConfigKeys) => store)

  const singleImg = !asPath.includes('strain') ? true : false

  let imagePath = useGetImagePath({ withExtension: singleImg })
  if (!singleImg) {
    imagePath = `${imagePath}-${store.bridge.name.toLowerCase()}.png`
  }

  return (
    <div className='flex w-full max-w-sm flex-col space-y-4 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Sensor configuration</span>
      <div className='space-y-2'>
        {Object.keys(initial).map(key => {
          return (
            <ConfigField
              key={key}
              name={key}
              fields={fields}
              useStore={useStore}
              disabled={disabled}
            />
          )
        })}
      </div>
      <div className='mt-1'>
        <div className='mb-1 text-sm'>Simplfied schematic:</div>
        <SchematicImage imagePath={imagePath} />
      </div>
      <div>
        <div className='mt-1 flex flex-row gap-2'>
          <Button fullWidth onClick={configSaveHandler} disabled={disabled}>
            Save configuration
          </Button>
          <Button
            modifier='outline'
            variant='default'
            fullWidth
            onClick={() => reload()}
            disabled={!disabled}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
