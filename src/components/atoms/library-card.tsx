import { Card } from '@ui/card'
import { LibraryCardProps as LibraryItem } from '@atoms/library-card'
import { LaboratoryProps, LibraryProps } from '@data/labs-library'
export interface LibraryCardProps extends LaboratoryProps {
  category: string
}

export const LibraryCard = ({
  category,
  name,
  description,
  href
}: LibraryCardProps) => {
  return (
    <div className='w-min rounded-md bg-gray-100 shadow transition-transform hover:scale-105 hover:outline hover:outline-1 hover:outline-blue-500 dark:bg-gray-800/70 dark:hover:outline-blue-400'>
      <Card
        category={category}
        title={name}
        description={description}
        redirects={{
          buttonLabel: 'Start laboratory',
          href: `/laboratories/${category}${href}`
        }}
      />
    </div>
  )
}

export const makeLibraryCards = (library: LibraryProps[]): LibraryItem[] => {
  let libraryCards: LibraryItem[] = []

  library.forEach(element => {
    const { category, laboratories } = element

    laboratories.forEach(laboratory => {
      libraryCards.push({
        category: category,
        name: laboratory.name,
        description: laboratory.description,
        href: laboratory.href
      })
    })
  })

  return [...libraryCards]
}
