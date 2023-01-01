import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Button, ButtonProps } from './button'
import { IconCaretDown } from '@tabler/icons'

interface DropdownButtonProps extends ButtonProps {
  children: React.ReactNode
  withCaret?: boolean
}
const DropdownButton = ({
  children,
  withCaret,
  ...props
}: DropdownButtonProps) => {
  return (
    <Menu.Button as={Button} {...props}>
      {children}
      {withCaret && <IconCaretDown className='h-4 w-4 fill-gray-50' />}
    </Menu.Button>
  )
}

interface DropdownRootProps extends DropdownButtonProps {
  label: React.ReactNode
  children: React.ReactNode
}

const DropdownRoot = ({ label, children, ...props }: DropdownRootProps) => {
  return (
    <Menu
      as='div'
      className={`relative inline-block text-left ${
        props.fullWidth && 'w-full'
      }`}
    >
      <DropdownButton {...props}>{label}</DropdownButton>
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
      <button
        className='relative cursor-default select-none py-2 pl-3 pr-9 text-gray-700 ui-active:bg-gray-300/40 ui-active:text-gray-900 dark:text-gray-300 dark:ui-active:bg-gray-700/40 dark:ui-active:text-gray-50'
        {...props}
      >
        {children}
      </button>
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
