import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Button, ButtonProps } from './button'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DropdownButtonProps extends ButtonProps {
  children: React.ReactNode
  withArrow?: boolean
}
const DropdownButton = ({
  children,
  withArrow,
  ...props
}: DropdownButtonProps) => {
  return (
    <Menu.Button as={Button} {...props}>
      {children}
      {withArrow && <ChevronDownIcon className='h-5 w-5' />}
    </Menu.Button>
  )
}

interface DropdownRootProps {
  children: React.ReactNode
}

const DropdownRoot = ({ children }: DropdownRootProps) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      {children}
    </Menu>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
}

const DropdownItem = ({ children, ...props }: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`bg-gray-100 dark:bg-gray-800 ${
            active &&
            ' bg-gray-200 font-medium text-gray-900 dark:bg-gray-700/90 dark:text-gray-50'
          } flex w-full items-center gap-2 rounded px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

interface DropdownItemsProps {
  children: React.ReactNode
}

const DropdownItems = ({ children }: DropdownItemsProps) => {
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
      <Menu.Items className='absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y rounded border bg-gray-100 shadow-lg focus-visible:outline-none dark:divide-gray-700/70 dark:border-gray-700/70 dark:bg-gray-800'>
        {children}
      </Menu.Items>
    </Transition>
  )
}

interface DropdownSection {
  children: React.ReactNode
}

const DropdownSection = ({ children }) => {
  return <div className='px-1 py-1'>{children}</div>
}

export const Dropdown = Object.assign(DropdownRoot, {
  Button: DropdownButton,
  Items: DropdownItems,
  Section: DropdownSection,
  Item: DropdownItem
})
