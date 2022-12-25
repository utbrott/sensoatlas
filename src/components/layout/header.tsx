import { Button } from '@ui/button';
import { AppLogo } from '@components/ui/logo';
import { ThemeToggle } from '@components/atoms/theme-toggle';
import { MarkGithubIcon } from '@primer/octicons-react';

export const Header = () => {
  return (
    <div className='box-border sticky top-0 z-50 flex items-center justify-between px-8 py-2 border-b bg-gray-50 dark:border-gray-700 h-14 dark:bg-gray-900'>
      <AppLogo variant='full' withGradient />
      <div className='flex gap-x-2'>
        <ThemeToggle />
        <Button
          variant='default'
          modifier='ghost'
          iconOnly
          href='https://github.com/utbrott/sensoatlas'
        >
          <MarkGithubIcon className='w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};
