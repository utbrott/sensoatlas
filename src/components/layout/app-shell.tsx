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
        <div className='fixed block h-screen w-64 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700 scrollbar-thumb-rounded'>
          <Navbar />
          <div className='h-14' />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  )
}
