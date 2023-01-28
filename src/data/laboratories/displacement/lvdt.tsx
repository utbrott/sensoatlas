import { ConfigItem } from '@atoms/config'
import { TaskItem } from '@atoms/tasks'
import { units } from '@data/units'
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'
import { TableProps, useParseTable } from '@hooks/use-parse-table'

export const LvdtPageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Strain gauge sensors</span>
      <span className='text-justify text-sm text-gray-700 dark:text-gray-300'>
        <p>
          Choose a sensor configuration below and save it, then complete the
          tasks that will be shown on the new card. Leaving the page or clicking
          reset clears the configuration. Remember that doing so will delete any
          progress. If you need to reset the configuration, but you generated
          the graphs already, save them before clicking reset.
        </p>
      </span>
    </div>
  )
}

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

export const LvdtArticle = () => {
  const resistanceNoTemperature: EquationProps = {
    equations: ['$\\Delta R=R\\cdot \\varepsilon \\cdot GF$'],
    symbols: [
      `$R$ is base resistance ${units.ohms},`,
      `$\\varepsilon$ is applied strain ${units.microstrains},`,
      '$GF$ is gauge factor.'
    ]
  }

  const resistanceWithTemperature: EquationProps = {
    equations: [
      '$\\Delta R=R\\cdot (\\varepsilon \\cdot GF + \\alpha(T-T_{ref}))$'
    ],
    symbols: [
      `$R$ is base resistance ${units.ohms},`,
      `$\\varepsilon$ is applied strain ${units.microstrains},`,
      '$GF$ is gauge factor.',
      '$\\alpha$ is temperature coefficient,',
      `$T$ is surroundings temperature [${units.celcius}],`,
      `$T_{ref}$ is reference temperature, 20${units.celcius}.`
    ]
  }

  const bridgeOutput: EquationProps = {
    equations: [
      '$V_{out}^{1SG} = \\frac{1}{4}V_{in}(\\cfrac{\\Delta R}{R})$',
      '$V_{out}^{2SG}=\\frac{1}{4}V_{in}(\\cfrac{\\Delta R}{R}-\\cfrac{(-\\Delta R)}{R})=\\cfrac{1}{2}V_{in}(\\cfrac{\\Delta R}{R})$',
      '$V_{out}^{4SG}=\\frac{1}{4}V_{in}(\\cfrac{\\Delta R}{R}-\\cfrac{(-\\Delta R)}{R}+\\cfrac{\\Delta R}{R}-\\cfrac{(-\\Delta R)}{R})=V_{in}(\\cfrac{\\Delta R}{R})$'
    ],
    symbols: [
      '$V_{in}$ is input voltage [V],',
      `$R$ is base resistance ${units.ohms},`,
      `$\\Delta R$ is calculated resistance change ${units.ohms}.`
    ]
  }

  const strainSensorTable: TableProps = {
    headers: [
      {
        label: 'Metal'
      },
      {
        label: 'Gauge factor'
      },
      {
        label: 'Temperature coefficient'
      }
    ],
    data: [
      ['Copper', 2.6, 0.004041],
      ['Constantan', 2.1, -0.000074],
      ['Platinum', 6.1, 0.003729],
      ['Monel', 1.9, 0.0011]
    ]
  }

  return (
    <span className='text-justify text-sm'>
      <p>
        Devices used to measure strain on an object. The most common type of
        strain gauge consists of an insulating flexible backing which supports a
        metallic foil pattern. The gauge is attached to the object by a suitable
        adhesive. As the object is deformed, the foil is deformed, causing its
        electrical resistance to change. This resistance change, usually
        measured using a Wheatstone bridge, is related to the strain by the
        quantity known as the gauge factor.
      </p>
      <h3>Calculating resistance change</h3>
      <p>
        With strain gauges in a Wheatstone bridge configuration the output
        voltage is measured based off of resistance change, but depending on the
        configuration temperature of gauge&apos;s surrounding can make a
        difference. Temperature effect should be taken into account when using
        Quater Bridge configuration, in other cases it is cancelled out (you can
        verify that by using the equation that has temperature effect, and
        substitute it in the bridge output voltage equations).
      </p>
      <h4>With temperature effect</h4>
      {useParseEquation({ ...resistanceWithTemperature })}
      <h4>Without temperature effect</h4>
      {useParseEquation({ ...resistanceNoTemperature })}
      <h3>Calculating output voltage of a bridge</h3>
      <p>
        Because the resistance change is measured using a Wheatstone bridge
        configuration, there&apos;s a need to use following calculations to get
        output voltage from the measurement. The &apos;1, 2, 4SG&apos; denotes
        to which bridge configuration the equation should be used (by the number
        of working strain gauges in bridge).
      </p>
      {useParseEquation({ ...bridgeOutput })}
      <h3>Material constants</h3>
      {useParseTable({ ...strainSensorTable })}
    </span>
  )
}
