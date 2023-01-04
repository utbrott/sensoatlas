import { FaHome } from 'react-icons/fa';
import { IoIosFolderOpen } from 'react-icons/io';

import { NavItem } from '@components/sidebar/nav-item';

export const navItems: NavItem[] = [
  {
    type: 'header',
    label: 'General',
  },
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
    href: '/laboratories',
    icon: IoIosFolderOpen,
    label: 'Library',
  },
  {
    type: 'linkChild',
    href: '/laboratories/temperature',
    label: 'Temperature sensors',
  },
  {
    type: 'linkChild',
    href: '/laboratories/displacement',
    label: 'Displacement sensors',
  },
  {
    type: 'linkChild',
    href: '/laboratories/strain',
    label: 'Strain gauge sensors',
  },
];
