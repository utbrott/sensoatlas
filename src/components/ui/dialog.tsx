import React, { Fragment, SetStateAction } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { Button } from './button'
import { IconX } from '@tabler/icons'

interface HeaderProps extends Pick<Props, 'closeHandler'> {
  title: string
  withCloseAction?: boolean
}
const DialogHeader = ({
  title,
  withCloseAction,
  closeHandler
}: HeaderProps) => {
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex w-full items-start justify-start'>
        <HeadlessDialog.Title
          className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-50'
          as='h3'
        >
          {title}
        </HeadlessDialog.Title>
      </div>
      {withCloseAction && (
        <Button
          variant='default'
          modifier='ghost'
          iconOnly
          onClick={() => closeHandler(false)}
        >
          <IconX className='h-5 w-5' />
        </Button>
      )}
    </div>
  )
}

interface PanelProps extends HeaderProps {
  children: React.ReactNode
}

const DialogPanel = ({ children, ...props }: PanelProps) => {
  return (
    <div className='fixed inset-0 overflow-y-auto'>
      <div className='flex min-h-full items-center justify-center p-5 text-center'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <HeadlessDialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md border bg-gray-50 p-4 shadow-xl transition-all dark:border-gray-700/30 dark:bg-gray-800'>
            <DialogHeader {...props} />
            <div className='mt-2 flex items-center justify-start'>
              {children}
            </div>
          </HeadlessDialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}

interface Props extends HeaderProps {
  isOpen: boolean
  closeHandler: React.Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const Dialog = ({
  title,
  isOpen,
  closeHandler,
  children,
  ...props
}: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog as='div' className='relative z-10' onClose={closeHandler}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity' />
        </Transition.Child>
        <DialogPanel
          title={title}
          withCloseAction={props.withCloseAction}
          closeHandler={closeHandler}
        >
          {children}
        </DialogPanel>
      </HeadlessDialog>
    </Transition>
  )
}
