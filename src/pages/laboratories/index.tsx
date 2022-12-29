import Head from 'next/head'
import { AppShell } from '@ui/Layout'
import { library } from '@data/labs-library'
import { LibraryCard } from '@ui/LibraryCard'
import { useMakeLibraryCards } from '@hooks/useMakeLibraryCards'

export default function Library() {
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
