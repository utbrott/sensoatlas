import { NavItemProps } from '@atoms/navigation'
import { library, LibraryProps } from './labs-library'

const appRoutesCreator = (library: LibraryProps[]): NavItemProps[] => {
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

const introRoutes: NavItemProps[] = [
  {
    label: 'Getting started',
    children: [
      { label: 'Introduction', href: '/introduction' },
      { label: 'Library', href: '/laboratories' }
    ]
  }
]

const laboratoryRoutes: NavItemProps[] = appRoutesCreator(library)

export const navItems: NavItemProps[] = [...introRoutes, ...laboratoryRoutes]
