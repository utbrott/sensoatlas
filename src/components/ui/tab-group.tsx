import { Tab as HeadlessTab } from '@headlessui/react'

interface WithChildrenProps {
  children: React.ReactNode
}

interface TabGroupProps extends WithChildrenProps {}

const Group = ({ children }: TabGroupProps) => {
  return <HeadlessTab.Group>{children}</HeadlessTab.Group>
}

interface ListProps extends WithChildrenProps {}

const List = ({ children }: ListProps) => {
  return (
    <HeadlessTab.List className='flex space-x-1 rounded-md bg-gray-300/30 p-1 dark:bg-gray-700/30'>
      {children}
    </HeadlessTab.List>
  )
}

interface TabProps extends WithChildrenProps {}

const TabRoot = ({ children }: TabProps) => {
  return (
    <HeadlessTab className='w-full select-none rounded-md py-2 text-sm leading-5 text-gray-600 focus:outline-none hover:bg-gray-400/20 hover:text-gray-900 ui-selected:bg-gray-300/70 ui-selected:font-semibold ui-selected:text-gray-900 dark:hover:bg-gray-600/20 dark:hover:text-gray-50 dark:ui-selected:bg-gray-700/70 dark:ui-selected:text-gray-50'>
      {children}
    </HeadlessTab>
  )
}

interface PanelsProps extends WithChildrenProps {}

const Panels = ({ children }: PanelsProps) => {
  return <HeadlessTab.Panels className='mt-2'>{children}</HeadlessTab.Panels>
}

interface PanelProps extends WithChildrenProps {}

const Panel = ({ children }: PanelProps) => {
  return (
    <div className='rounded-md'>
      <HeadlessTab.Panel className='max-h-fit rounded-md bg-gray-200/30 dark:bg-gray-800'>
        {children}
      </HeadlessTab.Panel>
    </div>
  )
}

export const Tab = Object.assign(TabRoot, { Group, List, Panels, Panel })
