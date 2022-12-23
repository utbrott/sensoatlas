import { Button } from '@ui/button';
import { AppLogo } from '@components/ui/logo';
import { ThemeToggle } from '@components/ui/theme-toggle';
import { MarkGithubIcon } from '@primer/octicons-react';

export const Header = () => {
  return (
    <div className='flex items-center justify-between px-8 pt-2'>
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
