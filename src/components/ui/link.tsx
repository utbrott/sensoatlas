import { ButtonOrLink, Props as ButtonOrLinkProps } from './button-or-link';
import { ArrowTopRightOnSquareIcon as LinkExternalIcon } from '@heroicons/react/20/solid';

export interface Props extends ButtonOrLinkProps {
  isExternal?: boolean;
}

export const Link = ({ isExternal, ...props }: Props) => {
  return (
    <span className='flex flex-row items-center gap-1 cursor-pointer max-w-fit hover:underline focus-visible:outline-none focus-visible-ring-2'>
      <ButtonOrLink className='text-sky-500 dark:text-sky-400' {...props} />
      {isExternal && (
        <LinkExternalIcon className='w-4 h-4 text-sky-500 dark:text-sky-400' />
      )}
    </span>
  );
};
