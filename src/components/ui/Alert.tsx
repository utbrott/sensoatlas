import { cva, VariantProps } from 'class-variance-authority'
import {
  XCircleIcon as ErrorIcon,
  ExclamationTriangleIcon as WarningIcon,
  CheckCircleIcon as SuccessIcon,
  InformationCircleIcon as InfoIcon
} from '@heroicons/react/20/solid'

const alert = cva(
  'flex items-start justify-center min-h-fit rounded-md p-4 border gap-4 bg-opacity-20 dark:bg-opacity-10',
  {
    variants: {
      status: {
        error: 'bg-red-600 border-red-600/20',
        success: 'bg-green-600 border-green-600/20',
        warning: 'bg-yellow-600 border-yellow-600/20',
        info: 'bg-sky-600 border-sky-600/20'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit'
      },
      accentBorder: {
        true: 'border-l-[6px]'
      }
    },
    defaultVariants: {
      status: 'error'
    },
    compoundVariants: [
      {
        accentBorder: true,
        status: 'error',
        className: 'border-l-red-500/80'
      },
      {
        accentBorder: true,
        status: 'success',
        className: 'border-l-green-500/80'
      },
      {
        accentBorder: true,
        status: 'warning',
        className: 'border-l-yellow-500/80'
      },
      {
        accentBorder: true,
        status: 'info',
        className: 'border-l-sky-500/80'
      }
    ]
  }
)

const alertIcon = cva('w-5 h-5', {
  variants: {
    status: {
      error: 'text-red-500 ',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      info: 'text-sky-500'
    }
  }
})

const alertTitle = cva('h-5 w-full font-semibold text-sm tracking-wide', {
  variants: {
    status: {
      error: 'text-red-700 dark:text-red-500/90',
      success: 'text-green-700 dark:text-green-500/90',
      warning: 'text-yellow-700 dark:text-yellow-500/90',
      info: 'text-sky-700 dark:text-sky-600'
    }
  }
})

interface AlertIconProps extends VariantProps<typeof alertIcon> {}

export const AlertIcon = ({ status }: AlertIconProps) => {
  switch (status) {
    case 'error':
      return <ErrorIcon className={alertIcon({ status })} />
    case 'success':
      return <SuccessIcon className={alertIcon({ status })} />
    case 'warning':
      return <WarningIcon className={alertIcon({ status })} />
    case 'info':
      return <InfoIcon className={alertIcon({ status })} />
    default:
      break
  }
}

interface AlertProps extends VariantProps<typeof alert> {
  title?: string
  children?: React.ReactNode
}

export const Alert = ({
  status,
  fullWidth,
  accentBorder,
  title,
  children
}: AlertProps) => {
  return (
    <div className={alert({ status, fullWidth, accentBorder })}>
      <div className='flex items-start justify-start gap-4'>
        <AlertIcon status={status} />
      </div>
      <div className='flex w-full flex-col'>
        {title && <div className={alertTitle({ status })}>{title}</div>}
        {children && (
          <div className='w-full text-sm text-gray-700 dark:text-gray-300'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
