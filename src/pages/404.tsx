import Head from 'next/head';
import { Header, Footer } from '@components/layout';
import { Button } from '@components/ui/button';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found | SensoAtlas</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex flex-col justify-between h-screen'>
        <Header />
        <div className='m-auto'>
          <div className='flex flex-row gap-8 max-w-fit'>
            <span className='font-extrabold tracking-tight text-center text-transparent text-7xl bg-clip-text bg-gradient-to-br from-sky-500 dark:from-sky-400 to-blue-600 dark:to-blue-600'>
              404
            </span>
            <span className='flex flex-col items-start justify-center gap-1 pl-8 border-l dark:border-gray-600/50'>
              <h1 className='text-4xl font-bold tracking-tight'>
                Oops! Page not found
              </h1>
              <h2 className='opacity-70'>
                The page you&apos;re looking for wasn&apos;t found.
              </h2>
            </span>
          </div>
          <div className='flex justify-center mt-6'>
            <Button variant='primary' modifier='ghost' href='/'>
              Go back home
            </Button>
          </div>
        </div>
        <div />
        <Footer />
      </div>
    </>
  );
}
