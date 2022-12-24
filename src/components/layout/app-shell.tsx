import { Header } from './header';
import { Navbar } from '@components/atoms/navbar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <div className='flex flex-row justify-start'>
        <div className='fixed block w-64 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-gray-700'>
          <Navbar />
          <div className='h-14' />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
};
