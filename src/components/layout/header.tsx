import { Button } from '@ui/button'
import { AppLogo } from '@components/ui/logo'
import { ThemeToggle } from '@components/atoms/theme-toggle'
import { MarkGithubIcon } from '@primer/octicons-react'

export const Header = () => {
  return (
    <div className='sticky top-0 z-50 box-border flex h-14 items-center justify-between border-b bg-gray-50 px-8 py-2 dark:border-gray-700 dark:bg-gray-900'>
      <AppLogo variant='full' withGradient />
      <div className='flex gap-x-2'>
        <ThemeToggle />
        <Button
          variant='default'
          modifier='ghost'
          iconOnly
          href='https://github.com/utbrott/sensoatlas'
        >
          <MarkGithubIcon className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}
