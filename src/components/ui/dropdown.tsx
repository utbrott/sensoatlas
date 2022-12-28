import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Props as ButtonProps } from './button'
import { ButtonOrLink, Props as ButtonOrLinkProps } from './button-or-link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

interface DropdownButtonProps {
  children: React.ReactNode
  variant?: ButtonProps['variant']
  modifier?: ButtonProps['modifier']
}
export const DropdownButton = ({
  children,
  variant,
  modifier
}: DropdownButtonProps) => {
  return (
    <Menu.Button as={Button} variant={variant} modifier={modifier}>
      {children}
      <ChevronDownIcon className='h-6 w-5' />
    </Menu.Button>
  )
}

interface DropdownProps {
  children: React.ReactNode
}

export const Dropdown = ({ children }: DropdownProps) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      {children}
    </Menu>
  )
}

export interface DropdownItemProps extends ButtonOrLinkProps {}

export const DropdownItem = ({ children, ...props }: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <ButtonOrLink
          className={`bg-gray-200 dark:bg-gray-700 ${
            active
              ? 'border-l border-blue-400 bg-blue-400/10 dark:border-blue-500 dark:bg-blue-500/10'
              : ''
          } flex w-full items-center gap-2 px-4 py-2 text-sm`}
          {...props}
        >
          {children}
        </ButtonOrLink>
      )}
    </Menu.Item>
  )
}

export interface DropdownItemsProps {
  children: React.ReactNode
}

export const DropdownItems = ({ children }: DropdownItemsProps) => {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items className='absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-300/70 rounded bg-gray-200 shadow-lg focus-visible:outline-none dark:divide-gray-800/50 dark:bg-gray-700'>
        {children}
      </Menu.Items>
    </Transition>
  )
}
