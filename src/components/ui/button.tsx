import { cva, VariantProps } from 'class-variance-authority';
import { ButtonOrLink, Props as ButtonOrLinkProps } from './button-or-link';

const buttonStyles = cva(
  [
    'inline-flex items-center px-4 py-1 justify-center gap-2 rounded font-medium',
    'focus-visible:outline focus-visible:outline-1 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'
  ],
  {
    variants: {
      variant: {
        default:
          'bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 outline-zinc-200 dark:outline-zinc-700 active:bg-zinc-200 active:dark:bg-zinc-700',
        primary:
          'text-zinc-50 bg-blue-600 outline-blue-600 hover:bg-blue-700 active:bg-blue-600'
      },
      modifier: {
        outline:
          'bg-opacity-0 dark:bg-inherit hover:bg-opacity-20 dark:hover:bg-opacity-20 outline outline-1',
        ghost:
          'bg-opacity-0 dark:bg-inherit hover:bg-opacity-20 dark:hover:bg-opacity-20'
      },
      fullWidth: {
        true: 'w-full'
      },
      iconOnly: {
        true: 'px-2 py-2'
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        modifier: ['outline', 'ghost'],
        className: 'text-blue-500 dark:text-blue-400'
      }
    ],
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {}

export function Button({
  variant,
  modifier,
  iconOnly,
  fullWidth,
  ...props
}: Props) {
  return (
    <ButtonOrLink
      className={buttonStyles({ variant, modifier, iconOnly, fullWidth })}
      {...props}
    />
  );
}
