export interface LaboratoryProps {
  label?: string;
  name: string;
  description: string;
  href: string;
  disabled?: boolean;
}

export interface LibraryProps {
  category: string;
  laboratories: LaboratoryProps[];
}

export const library: LibraryProps[] = [
  {
    category: 'temperature',
    laboratories: [
      {
        label: 'RTDs',
        name: 'Resistance Temperature Detectors',
        description:
          'Learn about using relative resistance change to measure temperature.',
        href: '/rtd'
      },
      {
        name: 'Thermocouples',
        description:
          'Learn about using thermoelectric effect to measure temperature.',
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
        description:
          'Using a differential transformer to measure displacement.',
        href: '/lvdt'
      }
    ]
  },
  {
    category: 'strain',
    laboratories: [
      {
        name: 'Strain gauges',
        description: 'How to use relative resistance change to measure strain.',
        href: '/strain-gauge'
      }
    ]
  },
  {
    category: 'magnetoresistance',
    laboratories: [
      {
        name: 'AMR sensors',
        description:
          'Using change in electrical resistance to measure magnetic fields.',
        href: '/amr'
      },
      {
        label: 'Hall effect',
        name: 'Hall Effect sensors',
        description:
          'Learn about Hall effect and using it to measure magnetic fields.',
        href: '/hall-effect'
      }
    ]
  },
  {
    category: 'piezoelectricity',
    laboratories: [
      {
        name: 'Piezoelectric cable',
        description:
          "Piezoelectric effect and it's use in measuring force of an impact.",
        href: '/cable'
      },
      {
        name: 'Accelerometer',
        description:
          'Utilizing piezoelectric effect to measure acceleration and vibrations.',
        href: '/accelerometer'
      }
    ]
  },
  {
    category: 'transducers',
    laboratories: [
      {
        name: 'Measurement loop',
        description:
          'Learn the basics of how measurement (current) loops work.',
        href: '/measurement-loop'
      },
      {
        name: 'Pressure measurement',
        description:
          'How to use current loops to measure pressure and sudden pressure changes.',
        href: '/pressure'
      }
    ]
  }
];
