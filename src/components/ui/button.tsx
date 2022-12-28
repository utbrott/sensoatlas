import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useRouter } from 'next/router'

const buttonStyles = cva(
  [
    'box-border flex px-3 py-2 items-center justify-center gap-2 rounded text-sm font-medium',
    'focus-visible:outline focus-visible:outline-1 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'trasition-color ease-in-out duration-100'
  ],
  {
    variants: {
      variant: {
        accent:
          'text-zinc-50 bg-blue-500 outline-blue-500 hover:bg-blue-600 active:bg-blue-700',
        default:
          'bg-gray-200 outline-gray-300 hover:bg-gray-300 active:bg-gray-200 dark:bg-gray-700 dark:outline-gray-600 dark:hover:bg-gray-600 active:dark:bg-gray-700',
        negative:
          'text-zinc-50 bg-red-500 outline-red-500 hover:bg-red-600 active:bg-red-600'
      },
      modifier: {
        outline:
          'bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-10 dark:bg-opacity-0 dark:hover:bg-opacity-20 dark:active:bg-opacity-10 outline outline-1',
        ghost:
          'bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-10 dark:bg-opacity-0 dark:hover:bg-opacity-20 dark:active:bg-opacity-10'
      },
      fullWidth: {
        true: 'w-full'
      },
      iconOnly: {
        true: 'pl-3 pr-3'
      }
    },
    compoundVariants: [
      {
        variant: 'default',
        modifier: ['outline', 'ghost'],
        className:
          'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50'
      },
      {
        variant: 'accent',
        modifier: ['outline', 'ghost'],
        className:
          'text-blue-500 dark:text-blue-400 hover:bg-blue-500 active:bg-blue-500'
      },
      {
        variant: 'negative',
        modifier: ['outline', 'ghost'],
        className:
          'text-red-500 dark:text-red-400 hover:bg-red-500 active:bg-red-500'
      }
    ],
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonStyles> {}

const _Button = ({
  variant,
  modifier,
  iconOnly,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ variant, modifier, iconOnly, fullWidth })}
      {...props}
    />
  )
}

interface LinkButtonProps extends ButtonProps {
  href: string
}

const LinkButton = ({
  variant,
  modifier,
  iconOnly,
  fullWidth,
  href,
  ...props
}: LinkButtonProps) => {
  const router = useRouter()

  return (
    <button
      className={buttonStyles({ variant, modifier, iconOnly, fullWidth })}
      onClick={() => router.push(href)}
      {...props}
    />
  )
}

export const Button = Object.assign(_Button, { Link: LinkButton })
