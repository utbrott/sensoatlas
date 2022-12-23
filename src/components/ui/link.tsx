import { ButtonOrLink, Props as ButtonOrLinkProps } from './button-or-link';
import { LinkExternalIcon } from '@primer/octicons-react';

export interface Props extends ButtonOrLinkProps {
  isExternal?: boolean;
}

export const Link = ({ isExternal, ...props }: Props) => {
  return (
    <>
      <ButtonOrLink
        className='text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-2'
        {...props}
      />
      {isExternal && <LinkExternalIcon className='w-4 h-4 pl-1 text-sky-500' />}
    </>
  );
};
