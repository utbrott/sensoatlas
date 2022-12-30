import { SetStateAction } from 'react'
import { RadioGroup as HeadlessRadio } from '@headlessui/react'

interface RadioGroupRootProps {
  label?: React.ReactNode
  value: any
  selectionHandler: React.Dispatch<SetStateAction<any>>
  disabled?: boolean
  children: React.ReactNode
}

const RadioGroupRoot = ({
  label,
  value,
  selectionHandler,
  children,
  ...props
}: RadioGroupRootProps) => {
  return (
    <HeadlessRadio
      value={value}
      onChange={selectionHandler}
      className='w-full'
      disabled={props.disabled}
    >
      <HeadlessRadio.Label className='text-sm'>{label}</HeadlessRadio.Label>
      {children}
    </HeadlessRadio>
  )
}

interface RadioGroupOptionsProps {
  order?: 'flex-row' | 'flex-col'
  children: React.ReactNode
}

const RadioGroupOptions = ({
  order = 'flex-row',
  children
}: RadioGroupOptionsProps) => {
  return (
    <div className={`flex w-full justify-between gap-2 ${order}`}>
      {children}
    </div>
  )
}

interface RadioGroupOptionProps {
  variant?: 'simple' | 'card'
  value: any
  children: React.ReactNode
}

const RadioGroupOption = ({
  variant = 'simple',
  value,
  children,
  ...props
}: RadioGroupOptionProps) => {
  return (
    <HeadlessRadio.Option
      value={value}
      {...props}
      className='w-full cursor-pointer select-none gap-1'
    >
      {({ checked, disabled }) => (
        <>
          {variant === 'simple' ? (
            <span className='flex flex-row items-center gap-1'>
              <input
                type='radio'
                className='transition-color h-4 w-4 cursor-pointer border-2 bg-transparent duration-100 checked:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-60'
                value={value}
                checked={checked}
                disabled={disabled}
              />
              <span
                className={`text-sm ${
                  disabled && 'cursor-not-allowed opacity-60'
                } ${checked && 'font-medium'}`}
              >
                {children}
              </span>
            </span>
          ) : (
            <div
              className={`flex w-full items-center justify-center rounded px-2 py-2 text-sm ${
                checked
                  ? 'bg-blue-500 font-medium text-gray-50'
                  : 'bg-gray-400/50 dark:bg-gray-700/50'
              } ${disabled && 'cursor-not-allowed bg-opacity-40 opacity-60'}`}
            >
              {children}
            </div>
          )}
        </>
      )}
    </HeadlessRadio.Option>
  )
}

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Options: RadioGroupOptions,
  Option: RadioGroupOption
})
