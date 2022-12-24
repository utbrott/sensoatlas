import { FacultyLogo } from '@components/ui/logo';

export const Footer = () => {
  return (
    <footer className='flex flex-col'>
      <div className='box-border px-8 py-4 border-t border-gray-700/50'>
        <FacultyLogo variant='full' />
      </div>
    </footer>
  );
};
