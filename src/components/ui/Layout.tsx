import { Button } from '@ui/Button'
import { Logo } from '@ui/Logo'
import { ThemeToggle } from '@ui/ThemeToggle'
import { Navbar } from '@ui/Navbar'
import { MarkGithubIcon } from '@primer/octicons-react'

export const Header = () => {
  return (
    <div className='sticky top-0 z-50 box-border flex h-14 items-center justify-between border-b bg-gray-100 px-8 py-2 dark:border-gray-700 dark:bg-gray-900'>
      <Logo.App variant='full' withGradient />
      <div className='flex gap-x-2'>
        <ThemeToggle />
        <Button.Link
          variant='default'
          modifier='ghost'
          iconOnly
          href='https://github.com/utbrott/sensoatlas'
        >
          <MarkGithubIcon className='h-5 w-5' />
        </Button.Link>
      </div>
    </div>
  )
}

export const Footer = () => {
  return (
    <footer className='flex flex-col'>
      <div className='box-border border-t px-8 py-4 dark:border-gray-700/50'>
        <Logo.Faculty variant='full' />
      </div>
    </footer>
  )
}

interface LayoutShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: LayoutShellProps) => {
  return (
    <>
      <Header />
      <div className='flex flex-row justify-start'>
        <div className='thin-scrollbar fixed block h-screen w-64 overflow-y-scroll'>
          <Navbar />
          <div className='h-14' />
        </div>
        <div className='w-full'>
          <div className='ml-64 mt-8'>{children}</div>
          <div className='h-14' />
        </div>
      </div>
    </>
  )
}

export const PageShell = ({ children }: LayoutShellProps) => {
  return (
    <div className='flex h-screen flex-col justify-between'>
      <Header />
      <div className='m-auto'>{children}</div>
      <Footer />
    </div>
  )
}
