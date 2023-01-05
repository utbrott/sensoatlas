export interface LaboratoryProps {
  label?: string
  name: string
  description: string
  href: string
  disabled?: boolean
}

export interface LibraryProps {
  category: string
  laboratories: LaboratoryProps[]
}

export const library: LibraryProps[] = [
  {
    category: 'temperature',
    laboratories: [
      {
        label: 'RTDs',
        name: 'Resistance Temperature Detectors',
        description: 'Short about RTDs',
        href: '/rtd'
      },
      {
        name: 'Thermocouples',
        description: 'Short about Thermocouples',
        href: '/thermocouple'
      }
    ]
  },
  {
    category: 'displacement',
    laboratories: [
      {
        label: 'LVDT',
        name: 'Linear Variable Differential Transformer',
        description: 'Short about LVDTs',
        href: '/lvdt'
      }
    ]
  },
  {
    category: 'strain',
    laboratories: [
      {
        name: 'Strain gauges',
        description: 'Short about strain gauges',
        href: '/strain-gauge'
      }
    ]
  },
  {
    category: 'magnetoresistance',
    laboratories: [
      {
        name: 'AMR sensors',
        description: 'Short about AMR sensors',
        href: '/amr'
      },
      {
        label: 'Hall effect',
        name: 'Hall Effect sensors',
        description: 'Short about hall effect sensors',
        href: '/hall-effect'
      }
    ]
  },
  {
    category: 'piezoelectricity',
    laboratories: [
      {
        name: 'Piezoelectric cable',
        description: 'Short about piezoelectric cable',
        href: '/cable'
      },
      {
        name: 'Accelerometer',
        description: 'Short about Accelerometer',
        href: '/accelerometer'
      }
    ]
  },
  {
    category: 'transducers',
    laboratories: [
      {
        label: 'Measurement loop',
        name: '4-20mA measurement loop',
        description: 'Short about Measurement loop',
        href: '/measurement-loop'
      },
      {
        name: 'Pressure measurement',
        description: 'Short about pressure measurement',
        href: '/pressure'
      }
    ]
  }
]
