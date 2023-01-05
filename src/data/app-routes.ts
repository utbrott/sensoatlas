import { NavItemProps } from '@atoms/navbar'
import { library } from './labs-library'
import { appRoutesCreator } from '@utils/library-utils'

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
