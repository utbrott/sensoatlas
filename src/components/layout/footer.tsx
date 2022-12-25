import { FacultyLogo } from '@components/ui/logo'

export const Footer = () => {
  return (
    <footer className='flex flex-col'>
      <div className='box-border border-t px-8 py-4 dark:border-gray-700/50'>
        <FacultyLogo variant='full' />
      </div>
    </footer>
  )
}
