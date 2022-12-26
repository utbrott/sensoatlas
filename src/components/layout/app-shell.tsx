import { Header } from './header'
import { Navbar } from '@components/atoms/navbar'

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <div className='flex flex-row justify-start'>
        <div className='thin-scrollbar fixed block h-screen w-64 overflow-y-scroll'>
          <Navbar />
          <div className='h-14' />
        </div>
        <div>
          <div className='mt-8 ml-64 w-full'>{children}</div>
          <div className='h-14' />
        </div>
      </div>
    </>
  )
}
