import Head from 'next/head'
import { AppShell } from '@components/layout'
import { library } from '@data/lab-library'
import { LibraryCard } from '@components/atoms/library-card'
import { useMakeLibraryCards } from '@hooks/use-make-library-cards'

const Library = () => {
  const cards = useMakeLibraryCards(library).map(card => {
    return (
      <LibraryCard
        category={card.category}
        name={card.name}
        description={card.description}
        href={card.href}
        key={card.href}
      />
    )
  })
  return (
    <>
      <Head>
        <title>Library | SensoAtlas</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AppShell>
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-2 items-center justify-center gap-8'>
            {cards}
          </div>
        </div>
      </AppShell>
    </>
  )
}

export default Library
