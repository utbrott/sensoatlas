import Head from 'next/head'
import { Header, Footer } from '@components/layout'
import { Button } from '@components/ui/button'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found | SensoAtlas</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex h-screen flex-col justify-between'>
        <Header />
        <div className='m-auto'>
          <div className='flex max-w-fit flex-row gap-8'>
            <span className='bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-center text-7xl font-extrabold tracking-tight text-transparent dark:from-sky-400 dark:to-blue-600'>
              404
            </span>
            <span className='flex flex-col items-start justify-center gap-1 border-l pl-8 dark:border-gray-600/50'>
              <h1 className='text-4xl font-bold tracking-tight'>
                Oops! Page not found
              </h1>
              <h2 className='opacity-70'>
                The page you&apos;re looking for wasn&apos;t found.
              </h2>
            </span>
          </div>
          <div className='mt-6 flex justify-center'>
            <Button variant='primary' modifier='ghost' href='/'>
              Go back home
            </Button>
          </div>
        </div>
        <div />
        <Footer />
      </div>
    </>
  )
}
