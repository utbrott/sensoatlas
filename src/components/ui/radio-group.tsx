import { RadioGroup as HeadlessRadio } from '@headlessui/react'
import { useState } from 'react'

interface RadioGroupRootProps {
  label?: React.ReactNode
  stacked?: boolean
  value: any
  selectionHandler: React.Dispatch<React.SetStateAction<any>>
  children: React.ReactNode
  disabled?: boolean
}

const RadioGroupRoot = ({
  label,
  value,
  selectionHandler,
  children,
  ...props
}: RadioGroupRootProps) => {
  return (
    <HeadlessRadio value={value} onChange={selectionHandler} {...props}>
      <HeadlessRadio.Label className='block text-sm dark:text-gray-300'>
        {label}
      </HeadlessRadio.Label>
      <div
        className={`flex w-full justify-between gap-2 ${
          props.stacked && 'flex-col'
        } ${label && 'mt-1'}`}
      >
        {children}
      </div>
    </HeadlessRadio>
  )
}

interface RadioGroupOptionProps {
  value: any
  children: React.ReactNode
}

const RadioGroupOption = ({ value, children }: RadioGroupOptionProps) => {
  return (
    <HeadlessRadio.Option
      value={value}
      className='w-full cursor-pointer select-none rounded border bg-gray-300/50 p-2 text-center text-sm hover:bg-gray-300 ui-checked:border-blue-500 ui-checked:font-medium ui-checked:text-blue-500 ui-disabled:cursor-not-allowed ui-disabled:bg-opacity-20 ui-disabled:opacity-60 dark:border-gray-600/50 dark:bg-gray-700/50 dark:ui-checked:border-blue-500'
    >
      {children}
    </HeadlessRadio.Option>
  )
}

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Option: RadioGroupOption
})

type UseRadioGroup = [Component: JSX.Element, selected: any]
interface UseRadioGroupProps {
  label?: string
  options: { name: string; [key: string]: number | string }[]
}

export const useRadioGroupComponent = ({
  label,
  options
}: UseRadioGroupProps): UseRadioGroup => {
  const [value, setValue] = useState(options[0].name)

  const RadioGroup = (
    <div className='w-full'>
      <RadioGroupRoot label={label} value={value} selectionHandler={setValue}>
        {options.map((option, optIdx) => {
          return (
            <RadioGroupOption value={option.name} key={optIdx}>
              {option.name}
            </RadioGroupOption>
          )
        })}
      </RadioGroupRoot>
    </div>
  )
  return [RadioGroup, value]
}
