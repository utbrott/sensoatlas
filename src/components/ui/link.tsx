import { ButtonOrLink, Props as ButtonOrLinkProps } from './button-or-link'
import { ArrowTopRightOnSquareIcon as LinkExternalIcon } from '@heroicons/react/20/solid'

export interface Props extends ButtonOrLinkProps {
  isExternal?: boolean
}

export const Link = ({ isExternal, ...props }: Props) => {
  return (
    <span className='focus-visible-ring-2 flex max-w-fit cursor-pointer flex-row items-center gap-1 focus-visible:outline-none hover:underline'>
      <ButtonOrLink className='text-sky-500 dark:text-sky-400' {...props} />
      {isExternal && (
        <LinkExternalIcon className='h-4 w-4 text-sky-500 dark:text-sky-400' />
      )}
    </span>
  )
}
