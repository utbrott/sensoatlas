import { NavItemProps } from '@components/ui/navbar';

export const navItems: NavItemProps[] = [
  {
    label: 'Introduction',
    children: [
      { label: 'Getting started', href: '/#' },
      { label: 'Library', href: '/labs#' }
    ]
  },
  {
    label: 'Labs: Temperature',
    children: [
      { label: 'RTDs', href: '/sandbox' },
      { label: 'Thermocouples', href: '/sandbox' }
    ]
  },
  {
    label: 'Labs: Displacement',
    children: [{ label: 'LVDTs', href: '/sandbox' }]
  },
  {
    label: 'Labs: Strain',
    children: [{ label: 'Strain gauges', href: '/sandbox' }]
  },
  {
    label: 'Labs: Magnetoresistance',
    children: [
      { label: 'AMR sensors', href: '/sandbox' },
      { label: 'Hall effect', href: '/sandbox' }
    ]
  },
  {
    label: 'Labs: Piezoelectrity',
    children: [
      { label: 'RTDs', href: '/sandbox' },
      { label: 'Thermocouples', href: '/sandbox' }
    ]
  },
  {
    label: 'Labs: Temperature',
    children: [
      { label: 'RTDs', href: '/sandbox' },
      { label: 'Thermocouples', href: '/sandbox' }
    ]
  }
];
