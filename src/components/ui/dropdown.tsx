import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button, Props as ButtonProps } from './button'
import { ButtonOrLink, Props as ButtonOrLinkProps } from './button-or-link'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DropdownButtonProps {
  children: React.ReactNode
  variant?: ButtonProps['variant']
  modifier?: ButtonProps['modifier']
  withArrow?: boolean
}
export const DropdownButton = ({
  children,
  variant,
  modifier,
  withArrow
}: DropdownButtonProps) => {
  return (
    <Menu.Button as={Button} variant={variant} modifier={modifier}>
      {children}
      {withArrow && <ChevronDownIcon className='h-5 w-5' />}
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
          className={`bg-gray-100 dark:bg-gray-800 ${
            active
              ? ' bg-gray-200/50 font-medium text-gray-900 dark:border-blue-500 dark:bg-gray-700/50 dark:text-gray-50'
              : ''
          } flex w-full items-center gap-2 rounded px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
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
      <Menu.Items className='border-box absolute left-0 mt-2 w-56 origin-top-left divide-y rounded border bg-gray-100 shadow-lg focus-visible:outline-none dark:divide-gray-700/70 dark:border-gray-700/70 dark:bg-gray-800'>
        {children}
      </Menu.Items>
    </Transition>
  )
}
