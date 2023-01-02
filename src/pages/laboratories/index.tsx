import { Shell } from '@ui/layout'
import { library } from '@data/labs-library'
import { LibraryCard, makeLibraryCards } from '@atoms/library-card'

export default function Library() {
  const Cards = makeLibraryCards(library).map(card => {
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
    <Shell.App title='Library | SensoAtlas'>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 items-center justify-center gap-8'>
          {Cards}
        </div>
      </div>
    </Shell.App>
  )
}
