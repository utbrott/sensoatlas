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
const DropdownButton = ({
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

const DropdownRoot = ({ children }: DropdownProps) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      {children}
    </Menu>
  )
}

interface DropdownItemProps extends ButtonOrLinkProps {}

const DropdownItem = ({ children, ...props }: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <ButtonOrLink
          className={`bg-gray-100 dark:bg-gray-800 ${
            active &&
            ' bg-gray-200 font-medium text-gray-900 dark:bg-gray-700/90 dark:text-gray-50'
          } flex w-full items-center gap-2 rounded px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
          {...props}
        >
          {children}
        </ButtonOrLink>
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
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
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
