import { Shell } from '@ui/layouts'
import { Button } from '@ui/button'
import { IconChevronRight } from '@tabler/icons'

export default function Introduction() {
  return (
    <Shell.App>
      <div className='flex w-full max-w-3xl flex-col content-center justify-center'>
        <div className='mb-4 text-3xl font-medium tracking-tight'>
          Welcome to SensoAtlas
        </div>
        <div className='text-normal max-w-3xl text-zinc-700 dark:text-zinc-300'>
          A highly interactive laboratory simulator for various sensors and
          transducers. Workflow is really simple - choose a laboratory that you
          want to work with and follow the steps listed on the page.
        </div>
        <div className='my-8 border-b dark:border-gray-700/70' />
        <div className='mb-4 text-xl font-medium tracking-tight'>
          What&apos;s included?
        </div>
        <div className='text-normal mb-1 max-w-3xl text-zinc-700 dark:text-zinc-300'>
          10 different laboratories, ranging from those about temperature
          sensors (RTD, thermocouples), through strain gauges and finishing on
          the measurement (current) loops.
        </div>
        <div className='text-normal mb-1 max-w-3xl text-zinc-700 dark:text-zinc-300'>
          Each laboratory has a set of tasks that are need to be completed.
          Sometimes supplied is some randomly generated data, and sometimes the
          task are based on the selected configuration.
        </div>
        <div className='text-normal mb-1 max-w-3xl text-zinc-700 dark:text-zinc-300'>
          Features is also a dedicated theory tab with all the necesary
          formulas, equations and tables with data that are needed to complete
          the lab.
        </div>
        <div className='my-8 border-b dark:border-gray-700/70' />
        <div className='mb-4 text-xl font-medium tracking-tight'>
          Getting started
        </div>
        <div className='text-normal mb-1 max-w-3xl text-zinc-700 dark:text-zinc-300'>
          To get started, click the button below to view the library of all
          laboratories included in SensoAtlas
        </div>
        <div className='mt-6'>
          <Button.Link variant='accent' href='/laboratories'>
            Browse library
            <IconChevronRight className='h-5 w-5' />
          </Button.Link>
        </div>
      </div>
    </Shell.App>
  )
}
