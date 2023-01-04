import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { IconCheck, IconSelector } from '@tabler/icons'
import Latex from 'react-latex'

interface SelectButtonProps
  extends Pick<SelectRootProps, 'fullWidth' | 'disabled'> {
  children: React.ReactNode
}

export const SelectButton = ({
  children,
  fullWidth,
  disabled
}: SelectButtonProps) => {
  return (
    <Listbox.Button
      className={`group relative cursor-default rounded bg-gray-300/50 py-1 pl-3 pr-10 text-left text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60 hover:bg-gray-300 disabled:hover:bg-opacity-60 dark:bg-gray-700/50 dark:focus-visible:border-blue-500 dark:hover:bg-gray-700 dark:disabled:hover:bg-opacity-60 ${
        fullWidth && 'w-full'
      }`}
      disabled={disabled}
    >
      <span className='flex items-center truncate font-medium'>{children}</span>
      <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
        <IconSelector className='h-5 w-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-50' />
      </span>
    </Listbox.Button>
  )
}

interface SelectRootProps {
  label?: string
  value: any
  onChange: (value: any) => void
  fullWidth?: boolean
  disabled?: boolean
  children: React.ReactNode
}

const SelectRoot = ({
  label,
  value,
  onChange,
  children,
  ...props
}: SelectRootProps) => {
  return (
    <Listbox value={value} onChange={onChange} disabled={props.disabled}>
      <span className='flex flex-col items-start'>
        {label && (
          <Listbox.Label className='block text-sm dark:text-gray-300'>
            {label}
          </Listbox.Label>
        )}
        <div
          className={`relative ${label && 'mt-1'} ${
            props.fullWidth && 'w-full'
          }`}
        >
          <SelectButton fullWidth={props.fullWidth}>{value}</SelectButton>
          <SelectOptions>{children}</SelectOptions>
        </div>
      </span>
    </Listbox>
  )
}

interface SelectOptionProps {
  value: any
  children: React.ReactNode
}

const SelectOption = ({ children, ...props }: SelectOptionProps) => {
  return (
    <Listbox.Option
      className='relative cursor-default select-none py-1 pl-3 pr-9 text-gray-700 ui-active:bg-gray-300/40 ui-active:text-gray-900 dark:text-gray-300 dark:ui-active:bg-gray-700/40 dark:ui-active:text-gray-50'
      {...props}
    >
      {({ selected }) => (
        <>
          <span className='block ui-selected:font-medium'>{children}</span>
          {selected ? (
            <span className='absolute inset-y-0 right-0 flex items-center pr-3'>
              <IconCheck className='h-5 w-5 stroke-blue-500 dark:stroke-blue-400' />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  )
}

interface SelectOptionsProps {
  children: React.ReactNode
}

const SelectOptions = ({ children }: SelectOptionsProps) => {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-75'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Listbox.Options className=' thin-scrollbar absolute z-10 mt-1 max-h-min w-full overflow-auto rounded border bg-gray-100 py-1 text-sm shadow-lg focus-visible:outline-none dark:border-gray-700/70 dark:bg-gray-800'>
        {children}
      </Listbox.Options>
    </Transition>
  )
}

export const Select = Object.assign(SelectRoot, {
  Option: SelectOption
})
