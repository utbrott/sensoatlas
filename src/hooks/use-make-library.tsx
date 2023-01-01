import { LibraryProps } from '@data/labs-library'
import { LibraryCardProps as LibraryItem } from '@atoms/library-card'

export const useMakeLibraryCards = (library: LibraryProps[]): LibraryItem[] => {
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
