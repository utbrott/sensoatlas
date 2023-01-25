import { Fragment, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IconX } from '@tabler/icons'
import { Button } from './button'

interface SlideOverHeaderProps {
  title: string
  closeHandler: React.Dispatch<SetStateAction<boolean>>
}

const SlideOverHeader = ({ title, closeHandler }: SlideOverHeaderProps) => {
  return (
    <div className='sticky top-14 z-50 flex h-14 flex-row items-center justify-between border-b bg-gray-50 pl-4 dark:border-gray-700 dark:bg-gray-800'>
      <div className='flex w-full flex-col items-start justify-center'>
        <Dialog.Title className='text-lg font-semibold text-gray-900 dark:text-gray-50'>
          {title}
        </Dialog.Title>
      </div>
      <Button
        variant='default'
        modifier='ghost'
        iconOnly
        onClick={() => closeHandler(false)}
      >
        <IconX className='h-5 w-5' />
      </Button>
    </div>
  )
}

interface SlideOverContentProps {
  children: React.ReactNode
}

const SlideOverContent = ({ children }: SlideOverContentProps) => {
  return <div className='relative mt-6 h-fit flex-1 px-4'>{children}</div>
}

interface SlideOverProps extends SlideOverHeaderProps, SlideOverContentProps {
  isOpen: boolean
}

export const SlideOver = ({
  isOpen,
  closeHandler,
  title,
  children
}: SlideOverProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeHandler}>
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

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-screen-md'>
                  <div className='thin-scrollbar flex h-full flex-col overflow-y-scroll bg-gray-50 shadow-xl dark:bg-gray-800'>
                    <div className='px-4'>
                      <SlideOverHeader
                        title={title}
                        closeHandler={closeHandler}
                      />
                      <div className='h-14' />
                      <SlideOverContent>{children}</SlideOverContent>
                      <div className='h-14' />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
