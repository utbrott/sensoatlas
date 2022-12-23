import Head from 'next/head';
import { Header, Footer } from '@components/layout';
import { Link } from '@components/ui/link';
import { ChevronLeftIcon } from '@primer/octicons-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found | SensoAtlas</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex flex-col justify-between h-screen'>
        <Header />
        <div className='relative max-w-5xl pt-24 mx-auto'>
          <h1 className='font-semibold tracking-tight text-center text-9xl'>
            <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-blue-600'>
              404
            </span>
          </h1>
          <p className='max-w-3xl mx-auto mt-6 text-lg text-center text-zinc-700 dark:text-zinc-300'>
            Oops! The page you&apos;re looking for could not be found.
          </p>
          <div className='flex justify-center mt-6'>
            <Link href='/'>
              <ChevronLeftIcon className='w-5 h-5' />
              Back to homepage
            </Link>
          </div>
        </div>
        <div />
        <Footer />
      </div>
    </>
  );
}
