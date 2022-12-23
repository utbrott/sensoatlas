import { Button } from '@components/ui/button';
import { AppLogo, FacultyLogo } from '@components/ui/logo';
import { ThemeToggle } from '@components/ui/theme-toggle';
import { MarkGithubIcon, ChevronRightIcon } from '@primer/octicons-react';
import Head from 'next/head';

export default function Index() {
  return (
    <>
      <Head>
        <title>Home | SensoAtlas</title>
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
          <h1 className='text-4xl font-semibold tracking-tight text-center'>
            Take your online laboratories to next level with{' '}
            <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-blue-600'>
              senso
            </span>
            <span className='font-normal'>atlas</span>
          </h1>
          <p className='max-w-3xl mx-auto mt-6 text-lg text-center text-zinc-700 dark:text-zinc-300'>
            An app designed and built to assist in learning about various
            sensors and transducers. Simple workflow - choose laboratory and
            follow instructions on the page.
          </p>
          <div className='flex justify-center mt-6'>
            <Button variant='primary' href='/labs'>
              Get started
              <ChevronRightIcon className='w-4 h-4' />
            </Button>
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
