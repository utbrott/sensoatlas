import { ConfigItem } from '@atoms/config'
import { TaskItem } from '@atoms/tasks'
import { units } from '@data/units'
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'
import { TableProps, useParseTable } from '@hooks/use-parse-table'

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Pressure measurement</span>
      <span className='text-justify text-sm text-gray-700 dark:text-gray-300'>
        <p>
          Choose a configuration below and save it, then complete the tasks that
          will be shown on the new card. Leaving the page or clicking reset
          clears the configuration. Remember that doing so will delete any
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
    id: 'sensor',
    label: 'Pressure sensor',
    options: [
      {
        name: 'Keller PY21',
        minReading: 4.06,
        maxReading: 6.07
      },
      {
        name: 'Wika A10',
        minReading: 7.495,
        maxReading: 15.48
      },
      {
        name: 'Kaeser 7.07',
        minReading: 3.205,
        maxReading: 15.995
      }
    ]
  }
]

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of pressure P [bar], form the processing characteristic and calculate the output current I [mA].',
    data: [],
    validation: []
  },
  {
    prompt:
      'Using the given (from theory) formula, calculate estimated time constant of a pressure sensor $\\tau$ [s], knowing that the starting presssure was 2.5 bar and pressure change lasted 0.5s.',
    validation: []
  }
]

export const Article = () => {
  const processingChar: EquationProps = {
    equations: [
      '$y = ax + b$',
      '$a = \\cfrac{y_{max} - y_{min}}{x_{max} - x_{min}}$',
      '$b = y_{min} - ax_{min}$'
    ],
    symbols: [
      '$y$ is processing characteristic,',
      '$a$ is slope constant,',
      '$b$ is slope intercept point,',
      '$x_{max}$, $x_{min}$ are max. and min. pressure readouts,',
      '$y_{max}$, $y_{min}$ are max. and min. current readouts,'
    ]
  }

  const timeConstant: EquationProps = {
    equations: ['$\\tau = \\cfrac{t}{ln(1 - \\frac{P_{change}}{P_0 - P_e})}$'],
    symbols: [
      '$t$ is time in which change happened [s],',
      '$P_{change}$ is change in pressure, from the starting value to 37%  [bar],',
      '$P_0$ is the starting pressure [bar],',
      '$P_e$ is the final pressure value [bar].'
    ]
  }

  const pressureSensors: TableProps = {
    headers: [
      { label: 'Pressure sensor' },
      { label: 'Min. readout @ 0.885bar', unit: units.milliamps },
      { label: 'Max. readout @ 2.855bar', unit: units.milliamps }
    ],
    data: [
      ['Keller PY21', 4.06, 6.07],
      ['Wika A10', 7.495, 15.48],
      ['Kaeser 7.07', 3.205, 15.995]
    ]
  }

  return (
    <span className='text-justify text-sm'>
      <p>
        A device for pressure measurement of gases or liquids. Pressure is an
        expression of the force required to stop a fluid from expanding, and is
        usually stated in terms of force per unit area. A pressure sensor
        usually acts as a transducer; it generates a signal as a function of the
        pressure imposed. Pressure sensors can be classified in terms of
        pressure ranges they measure, temperature ranges of operation, and most
        importantly the type of pressure they measure. Pressure sensors are
        variously named according to their purpose, but the same technology may
        be used under different names (absolute, gauge, differential, vacuum
        pressure sensors - to name a few). In this lab it doesn&apos;t matter
        what type of sensor is used, because all are working in the standard
        4-20mA measurement loop system.
      </p>
      <h3>Forming the processing characteristic</h3>
      <p>
        This can be done using basic calculus and formulas for linear
        polynomial, the constants should be rounded to 4th decimal place for
        optimal accuracy:
      </p>
      {useParseEquation({ ...processingChar })}
      <h3>Calculating the time constant</h3>
      {useParseEquation({ ...timeConstant })}
      <h3>Presssure sensor parameters</h3>
      {useParseTable({ ...pressureSensors })}
    </span>
  )
}
