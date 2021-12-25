import { FaHome } from 'react-icons/fa';
import { IoIosFolderOpen } from 'react-icons/io';
import { HiOutlineInformationCircle } from 'react-icons/hi';

import { NavItem } from '#types/nav-item';

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
    type: 'link',
    href: '/info',
    icon: HiOutlineInformationCircle,
    label: 'Informations',
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
  {
    type: 'linkChild',
    href: '/laboratories/piezoelectric',
    label: 'Piezoelectric sensors',
  },
];
