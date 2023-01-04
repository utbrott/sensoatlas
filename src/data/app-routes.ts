import { NavItemProps } from '@atoms/navbar'

export const navItems: NavItemProps[] = [
  {
    label: 'Getting started',
    children: [
      { label: 'Introduction', href: '/introduction' },
      { label: 'Library', href: '/laboratories' }
    ]
  },
  {
    label: 'Labs: Temperature',
    children: [
      { label: 'RTDs', href: '/laboratories/temperature/rtd' },
      { label: 'Thermocouples', href: '/laboratories/temperature/thermocouple' }
    ]
  },
  {
    label: 'Labs: Displacement',
    children: [{ label: 'LVDTs', href: '/laboratoies/displacement/lvdt' }]
  },
  {
    label: 'Labs: Strain',
    children: [
      { label: 'Strain gauges', href: '/laboratories/strain/strain-gauge' }
    ]
  },
  {
    label: 'Labs: Magnetoresistance',
    children: [
      { label: 'AMR sensors', href: '/laboratories/magnetoresistance/amr' },
      {
        label: 'Hall effect',
        href: '/laboratories/magnetoresistance/hall-effect'
      }
    ]
  },
  {
    label: 'Labs: Piezoelectrity',
    children: [
      {
        label: 'Piezoelectric cable',
        href: '/laboratories/piezoelectricity/cable'
      },
      {
        label: 'Accelerometer',
        href: '/laboratories/piezoelecricity/accelerometer'
      }
    ]
  },
  {
    label: 'Labs: Transducers',
    children: [
      {
        label: 'Measurement loop',
        href: '/laboratories/transducers/measurement-loop'
      },
      {
        label: 'Pressure transducers',
        href: '/laboratories/transducers/pressure'
      }
    ]
  }
]
