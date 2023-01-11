import { cva, VariantProps } from 'class-variance-authority'
import { IconLoader2 } from '@tabler/icons'

const spinner = cva('relative w-5 h-5', {
  variants: {
    size: {
      small: 'scale-[0.8]' /* 16px */,
      medium: 'scale-1' /* 20px */,
      large: 'scale-[1.6]' /* 32px */
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})

const spinnerInner = cva('absolute h-5 w-5 animate-ease-spin', {
  variants: {
    color: {
      white: 'stroke-white',
      blue: 'stroke-blue-500'
    },
    size: {
      small: 'stroke-2',
      medium: 'stroke-[2.5]',
      large: 'stroke-[3]'
    },
    withTransparency: {
      true: 'opacity-75'
    }
  },
  defaultVariants: {
    color: 'white',
    size: 'medium'
  }
})

interface SpinnerProps
  extends VariantProps<typeof spinner>,
    VariantProps<typeof spinnerInner> {}

export const Spinner = ({ size, color, withTransparency }: SpinnerProps) => {
  return (
    <span className={spinner({ size })}>
      <IconLoader2
        className={spinnerInner({ size, color, withTransparency })}
      />
    </span>
  )
}
