import { FacultyLogo } from '@components/ui/logo';

export const Footer = () => {
  return (
    <footer className='flex flex-col px-8'>
      <div className='h-px mt-6 bg-gray-400 dark:bg-gray-700' />
      <span className='pt-4 pb-4'>
        <FacultyLogo variant='full' />
      </span>
    </footer>
  );
};
