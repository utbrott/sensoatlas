import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from './button';
import { IconSunHigh, IconMoon } from '@tabler/icons';

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const t = theme === 'light' ? 'dark' : 'light';

  return isMounted ? (
    <Button
      variant='default'
      modifier='ghost'
      iconOnly
      onClick={() => setTheme(t)}
    >
      {theme === 'light' ? (
        <IconSunHigh className='h-5 w-5' />
      ) : (
        <IconMoon className='h-5 w-5' />
      )}
    </Button>
  ) : null;
}
