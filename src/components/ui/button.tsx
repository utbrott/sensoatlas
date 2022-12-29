import { ComponentProps } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

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
          'text-zinc-50 bg-blue-500 dark:bg-blue-600 outline-blue-500 dark:outline-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 active:bg-blue-500 dark:active:bg-blue-600',
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

export interface ButtonProps
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

interface SubmitButtonProps extends ButtonProps {}

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { formState } = useFormContext()

  return (
    <Button type='submit' disabled={formState.isSubmitting} {...props}>
      {formState.isSubmitting && (
        // Spinner, 20px
        <svg
          className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            stroke-width='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {children}
    </Button>
  )
}

export const Button = Object.assign(_Button, {
  Link: LinkButton,
  Submit: SubmitButton
})
