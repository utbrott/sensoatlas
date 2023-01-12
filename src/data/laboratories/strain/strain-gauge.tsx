import { ConfigItem } from '@utils/configuration'
import { TaskItem } from '@utils/tasks'
import { units } from '@data/units'

export const pageHeader = {}

export const configFields: ConfigItem[] = [
  {
    type: 'select',
    id: 'material',
    label: 'Inner wire material',
    options: [
      {
        name: 'Copper',
        gaugeFactor: 2.6,
        modulus: 110,
        tempCoeff: 0.004041
      },
      {
        name: 'Constantan',
        gaugeFactor: 2.1,
        modulus: 162,
        tempCoeff: -0.000074
      },
      {
        name: 'Platinum',
        gaugeFactor: 6.1,
        modulus: 154,
        tempCoeff: 0.003729
      },
      {
        name: 'Monel',
        gaugeFactor: 1.9,
        modulus: 180,
        tempCoeff: 0.0011
      }
    ]
  },
  {
    type: 'radio',
    id: 'voltage',
    label: 'Input voltage (Vin)',
    options: [
      {
        name: '5V',
        voltage: 5
      },
      {
        name: '12V',
        voltage: 12
      }
    ]
  },
  {
    type: 'select',
    id: 'resistance',
    label: 'Resistance (R)',
    options: [
      {
        name: `120${units.ohmsUnicode}`,
        resistance: 120
      },
      {
        name: `350${units.ohmsUnicode}`,
        resistance: 350
      },
      {
        name: `600${units.ohmsUnicode}`,
        resistance: 600
      },
      {
        name: `700${units.ohmsUnicode}`,
        resistance: 700
      },
      {
        name: `1000${units.ohmsUnicode}`,
        resistance: 1000
      }
    ]
  },
  {
    type: 'radio',
    id: 'bridge',
    label: 'Bridge configuration',
    options: [
      {
        name: 'Quater',
        multiplier: 0.25
      },
      {
        name: 'Half',
        multiplier: 0.5
      },
      {
        name: 'Full',
        multiplier: 1.0
      }
    ]
  }
]

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Using the values of applied strain $\\varepsilon\\;[\\mu\\varepsilon]$ given below, calculate the output voltage Vout [mV].',

    data: [],
    validation: []
  },
  {
    prompt: `Using the values of temperature T [${units.celcius}] given below and strain $\\varepsilon$ = 1.5 $\\mu\\varepsilon$, calculate the output voltage Vout [mV].`,
    data: [],
    validation: []
  }
]
