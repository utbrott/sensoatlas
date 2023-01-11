import { Shell } from '@ui/layouts'
import { Button } from '@ui/button'

export default function Custom404() {
  return (
    <Shell.Page title='Not Found | SensoAtlas'>
      <div className='flex max-w-fit flex-row gap-8'>
        <span className='bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-center text-7xl font-extrabold tracking-tight text-transparent dark:from-sky-400 dark:to-blue-600'>
          404
        </span>
        <span className='flex flex-col items-start justify-center gap-1 border-l pl-8 dark:border-gray-600/50'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Oops! Page not found
          </h1>
          <h2 className='text-gray-600 dark:text-gray-400'>
            The page you&apos;re looking for wasn&apos;t found.
          </h2>
        </span>
      </div>
      <div className='mt-6 flex justify-center'>
        <Button.Link variant='accent' modifier='ghost' href='/'>
          Go back home
        </Button.Link>
      </div>
    </Shell.Page>
  )
}
