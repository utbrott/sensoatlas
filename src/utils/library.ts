import { LibraryProps } from '@data/labs-library'
import { LibraryCardProps } from '@atoms/library-card'
import { NavItemProps } from '@atoms/navbar'

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

export const appRoutesCreator = (library: LibraryProps[]): NavItemProps[] => {
  const navItems: NavItemProps[] = []

  const capitalFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  library.forEach(element => {
    const { category, laboratories } = element

    const children = laboratories.map(laboratory => {
      return {
        label: laboratory.label ? laboratory.label : laboratory.name,
        href: `/laboratories/${category.toLowerCase()}${laboratory.href}`
      }
    })

    navItems.push({
      label: `Labs: ${capitalFirst(category)}`,
      children: children
    })
  })

  return [...navItems]
}
