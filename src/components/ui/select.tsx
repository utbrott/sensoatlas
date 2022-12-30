import { Fragment, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { IconCheck, IconSelector } from '@tabler/icons'

interface SelectButtonProps extends Pick<SelectRootProps, 'fullWidth'> {
  children: React.ReactNode
}

export const SelectButton = ({ children, fullWidth }: SelectButtonProps) => {
  return (
    <Listbox.Button
      className={`group relative cursor-default rounded bg-gray-400/50 py-2 pl-3 pr-10 text-left text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent hover:bg-gray-300/50  dark:bg-gray-700/50 dark:focus-visible:border-blue-500 dark:hover:bg-gray-700 ${
        fullWidth && 'w-full'
      }`}
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
  selectionHandler: React.Dispatch<SetStateAction<any>>
  fullWidth?: boolean
  children: React.ReactNode
}

const SelectRoot = ({
  label,
  value,
  selectionHandler,
  children,
  ...props
}: SelectRootProps) => {
  return (
    <Listbox value={value} onChange={selectionHandler}>
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
          {children}
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
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-3 pr-9 ${
          active
            ? 'bg-gray-300/40 text-gray-900 dark:bg-gray-700/40 dark:text-gray-50'
            : 'text-gray-700 dark:text-gray-300'
        }`
      }
      {...props}
    >
      {({ selected }) => (
        <>
          <div className='flex items-center'>
            <span
              className={`ml-3 block truncate ${
                selected ? 'font-medium' : 'font-normal'
              }`}
            >
              {children}
            </span>
          </div>
          {selected ? (
            <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-500'>
              <IconCheck className='h-4 w-4' />
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
      <Listbox.Options className=' thin-scrollbar absolute z-10 mt-1 max-h-min w-64 overflow-auto rounded border bg-gray-100 py-1 text-sm shadow-lg focus-visible:outline-none dark:border-gray-700/70 dark:bg-gray-800'>
        {children}
      </Listbox.Options>
    </Transition>
  )
}

export const Select = Object.assign(SelectRoot, {
  Options: SelectOptions,
  Option: SelectOption
})
