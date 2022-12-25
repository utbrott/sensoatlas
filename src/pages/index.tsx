import { Footer, Header } from '@components/layout'
import { Button } from '@components/ui/button'
import { ChevronRightIcon } from '@primer/octicons-react'
import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Head>
        <title>Home | SensoAtlas</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex h-screen flex-col justify-between'>
        <Header />
        <div className='relative m-auto flex max-w-5xl select-none flex-col items-center'>
          <h1 className='text-center text-4xl font-semibold tracking-tight'>
            Take your online laboratories to{' '}
            <span className='gradient-emphasis font-extrabold'>next level</span>
          </h1>
          <p className='mx-auto mt-6 max-w-3xl text-center text-lg text-zinc-700 dark:text-zinc-300'>
            An app designed and built to assist in learning about various
            sensors and transducers. Simple workflow - choose laboratory and
            follow instructions on the page.
          </p>
          <div className='mt-6 flex justify-center'>
            <Button variant='primary' href='/laboratories'>
              Get started
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div />
        <Footer />
      </div>
    </>
  )
}
