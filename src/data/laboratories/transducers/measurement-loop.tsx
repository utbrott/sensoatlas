import { ConfigItem } from '@atoms/config'
import { TaskItem } from '@atoms/tasks'
import { units } from '@data/units'
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'
import { TableProps, useParseTable } from '@hooks/use-parse-table'

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Measurement loop</span>
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
    type: 'radio',
    id: 'type',
    label: 'Transducer type',
    options: [
      {
        name: 'Unified U/I',
        type: 'voltage'
      },
      {
        name: 'Unified R/I',
        type: 'resistance'
      }
    ]
  },
  {
    type: 'radio',
    id: 'resistance',
    label: 'RTD used in R/I transducer',
    options: [
      {
        name: 'Pt100',
        max: 138.5
      },
      {
        name: 'Ni100',
        max: 161.5
      },
      {
        name: 'Cu100',
        max: 142.5
      }
    ]
  }
]

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of voltage U or resistance R (depending on what transducer type is selected) at 25% and 75% of range, calculate lower and upper measurement limits (U/R).',
    data: [],
    validation: []
  }
]

export const Article = () => {
  const processingChar: EquationProps = {
    equations: [
      '$y = A\\cdot I + B$',
      '$A =\\bigg(\\cfrac{y_{2} - y_{1}}{I_{2} - I_{1}}\\bigg)\\textsf{,}\\quad B = y_{1} - A \\cdot I_{1} $',
      '$\\quad$',
      '$\\therefore \\, y = \\bigg(\\cfrac{y_{2} - y_{1}}{I_{2} - I_{1}}\\bigg)\\cdot I + \\big(y_{1} - \\bigg(\\cfrac{y_{2} - y_{1}}{I_{2} - I_{1}}\\bigg)\\cdot I_{1}\\big)$'
    ],
    symbols: [
      '$y$ is voltage or resistance,',
      '$y_{1}$, $y_{2}$ are voltage or resistace values at specified % of range,',
      '$I_{1}$, $I_{2}$ are current values for corresponding % of range.'
    ]
  }

  return (
    <span className='text-justify text-sm'>
      <p>---</p>
      <h3>Forming the processing characteristic</h3>
      <p>
        The constants should be rounded to 4th decimal place for optimal
        accuracy. Then the resulting formula will allow for calculation of any
        current value corresponding to a set voltage or resistance or in the
        other direction - value of voltage or resistance that corresponds to a
        set current.
      </p>
      <p>
        Take a note that all RTDs used have &apos;100&apos; in the names, which
        means that
      </p>
      {useParseEquation({ ...processingChar })}
    </span>
  )
}
