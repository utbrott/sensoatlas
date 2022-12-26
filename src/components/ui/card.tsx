import { Button } from '@components/ui/button'

export interface Props {
  category?: string
  title: string
  description: string
  redirects?: { buttonLabel: string; href: string }
}

export const Card = ({ category, title, description, redirects }: Props) => {
  const { buttonLabel, href } = redirects
  return (
    <div className='flex h-full w-[32rem] max-w-md flex-col rounded p-8'>
      {category && (
        <p className='text-sm font-medium capitalize text-blue-500 dark:text-blue-400'>
          {category}
        </p>
      )}
      <div className='h-full'>
        <h5 className='mt-2 mb-4 text-xl font-semibold capitalize'>{title}</h5>
        <p className='mb-4 max-h-24 overflow-hidden text-sm text-gray-600 dark:text-gray-300 '>
          {description}
        </p>
      </div>
      {redirects && (
        <div className='max-w-fit'>
          <Button variant='default' href={href}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
