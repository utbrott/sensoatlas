import { default as NextLink } from 'next/link';
import { IconExternalLink } from '@tabler/icons';

export interface Props {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

export const Link = ({ isExternal, children, ...props }: Props) => {
  return (
    <NextLink className='text-blue-500 dark:text-blue-400' {...props}>
      <span className='focus-visible-ring-2 flex max-w-fit cursor-pointer flex-row items-center gap-1 focus-visible:outline-none hover:underline'>
        {children}
        {isExternal && (
          <IconExternalLink className='h-4 w-4 text-blue-500 dark:text-blue-400' />
        )}
      </span>
    </NextLink>
  );
};
