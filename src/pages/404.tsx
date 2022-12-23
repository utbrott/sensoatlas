import Head from 'next/head';
import { AppLogo, FacultyLogo } from '@components/ui/logo';
import { ThemeToggle } from '@components/ui/theme-toggle';
import { Button } from '@components/ui/button';
import { Link } from '@components/ui/link';
import { MarkGithubIcon, ChevronLeftIcon } from '@primer/octicons-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found | SensoAtlas</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex flex-col h-screen'>
        <div className='flex items-center justify-between px-8 pt-2'>
          <AppLogo variant='full' withGradient />
          <div className='flex gap-x-2'>
            <ThemeToggle />
            <Button
              variant='default'
              modifier='ghost'
              iconOnly
              href='https://github.com/utbrott/sensoatlas'
            >
              <MarkGithubIcon className='w-5 h-5' />
            </Button>
          </div>
        </div>
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
        <div className='h-full' />
        <footer className='flex justify-center pb-4'>
          <FacultyLogo variant='full' />
        </footer>
      </div>
    </>
  );
}
