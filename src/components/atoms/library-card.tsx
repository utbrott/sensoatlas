import { Card } from '@ui/card'
import { LaboratoryProps, LibraryProps } from '@data/labs-library'

export interface LibraryCardProps extends LaboratoryProps {
  category: string
  disabled?: boolean
}

export const LibraryCard = ({
  category,
  name,
  description,
  href,
  disabled
}: LibraryCardProps) => {
  return (
    <div
      className={`relative w-min rounded-md bg-gray-100 shadow transition-transform hover:scale-105 hover:outline hover:outline-1 hover:outline-blue-500 disabled:hover:scale-100 dark:bg-gray-800/70 dark:hover:outline-blue-400 ${
        disabled && 'pointer-events-none'
      }`}
    >
      {disabled && (
        <div
          className={`absolute h-full w-full ${'bg-gray-900/20 backdrop-blur-sm'}`}
        >
          <span className='flex h-full items-center justify-center text-2xl'>
            Currently unavailable
          </span>
        </div>
      )}
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

export const libraryCardCreator = (
  library: LibraryProps[]
): LibraryCardProps[] => {
  const libraryCards: LibraryCardProps[] = []

  library.forEach(element => {
    const { category, laboratories } = element

    laboratories.forEach(laboratory => {
      libraryCards.push({
        category: category,
        name: laboratory.name,
        description: laboratory.description,
        href: laboratory.href,
        disabled: laboratory.disabled
      })
    })
  })

  return [...libraryCards]
}
