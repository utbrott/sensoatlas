import { FaHome } from 'react-icons/fa';
import { IoIosFolderOpen } from 'react-icons/io';
import { HiCog } from 'react-icons/hi';
import { GoQuestion } from 'react-icons/go';

import { NavItem } from '#types/nav-item';

export const navItems: NavItem[] = [
  {
    type: 'link',
    href: '/',
    icon: FaHome,
    label: 'Home',
  },
  {
    type: 'header',
    label: 'Laboratories',
  },
  {
    type: 'link',
    href: '/library',
    icon: IoIosFolderOpen,
    label: 'Library',
  },
  {
    type: 'linkChild',
    href: '/library/temperature',
    label: 'Temperature sensors',
  },
  {
    type: 'linkChild',
    href: '/library/displacement',
    label: 'Displacement sensors',
  },
  {
    type: 'linkChild',
    href: '/library/strain',
    label: 'Strain gauge sensors',
  },
  {
    type: 'linkChild',
    href: '/library/piezoelectric',
    label: 'Piezoelectric sensors',
  },
  {
    type: 'header',
    label: 'General',
  },
  {
    type: 'link',
    href: '/info',
    icon: GoQuestion,
    label: 'Informations',
  },
];
