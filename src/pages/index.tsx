import { Shell } from '@ui/layouts'
import { Button } from '@ui/button'
import { IconChevronRight } from '@tabler/icons'

export default function Index() {
  return (
    <Shell.Page title='Home | SensoAtlas'>
      <div className='relative m-auto flex max-w-5xl select-none flex-col items-center'>
        <h1 className='text-center text-4xl font-semibold tracking-tight'>
          Take your online laboratories to{' '}
          <span className='gradient-emphasis font-extrabold'>next level</span>
        </h1>
        <p className='mx-auto mt-6 max-w-3xl text-center text-lg text-zinc-700 dark:text-zinc-300'>
          An app designed and built to assist in learning about various sensors
          and transducers. Simple workflow - choose laboratory and follow
          instructions on the page.
        </p>
        <div className='mt-6 flex justify-center'>
          <Button.Link variant='accent' href='/introduction'>
            Get started
            <IconChevronRight className='h-5 w-5' />
          </Button.Link>
        </div>
      </div>
    </Shell.Page>
  )
}
