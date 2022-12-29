export interface LaboratoryProps {
  name: string
  description: string
  href: string
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
        name: 'resistance temperature detectors',
        description: 'Short about RTDs',
        href: '/rtd'
      },
      {
        name: 'thermocouples',
        description: 'Short about Thermocouples',
        href: '/thermocouple'
      }
    ]
  },
  {
    category: 'displacement',
    laboratories: [
      {
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
        name: 'hall effect sensors',
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
