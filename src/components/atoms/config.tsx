import { Select } from '@ui/select'
import { RadioGroup } from '@ui/radio-group'
import Latex from 'react-latex'
import { InitialConfigType } from 'src/pages/sandbox'

export type ConfigItem = {
  type: 'select' | 'radio'
  id: string
  label?: string
  options?: { [key: string]: number | string }[]
}

interface ConfigFieldProps {
  value: string | number
  fields: ConfigItem[]
  useStore: any
  disabled?: boolean
}

const ConfigField = ({
  value,
  fields,
  disabled,
  useStore
}: ConfigFieldProps) => {
  const [fieldValue, setStore] = useStore((store: any) => store[value])

  const field = fields.find(element => element.id === value)
  const { type, label, options } = field

  function setOption(val: string) {
    const option = options.find((opt: { name: string }) => opt.name === val)
    setStore({ [value]: option })
  }

  if (type === 'select') {
    return (
      <Select
        value={fieldValue.name}
        onChange={value => setOption(value)}
        label={label}
        disabled={disabled}
        fullWidth
      >
        {options.map((option, index) => {
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
      onChange={value => setOption(value)}
      disabled={disabled}
      label={label}
    >
      {options.map((option, index) => {
        return (
          <RadioGroup.Option value={option.name} key={index}>
            {option.name}
          </RadioGroup.Option>
        )
      })}
    </RadioGroup>
  )
}

interface ConfigProps {
  config: InitialConfigType
  configFields: ConfigItem[]
  useStore: any
  isSaved?: boolean
}

export const Config = ({
  config,
  configFields,
  useStore,
  isSaved
}: ConfigProps) => {
  return (
    <div className='flex flex-col gap-2'>
      {Object.keys(config).map(key => {
        return (
          <ConfigField
            value={key}
            fields={configFields}
            key={key}
            useStore={useStore}
            disabled={isSaved}
          />
        )
      })}
    </div>
  )
}
