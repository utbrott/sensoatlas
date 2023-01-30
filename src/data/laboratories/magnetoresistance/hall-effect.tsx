import { ConfigItem } from '@atoms/config'
import { TaskItem } from '@atoms/tasks'
import { units } from '@data/units'
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'
import { TableProps, useParseTable } from '@hooks/use-parse-table'

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Hall effect sensors</span>
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
    label: 'Sensor material',
    options: [
      {
        name: 'Sillion (Si)',
        hallCoeff: 2500
      },
      {
        name: 'Gallium arsenide (GaAs)',
        hallCoeff: 2100
      },
      {
        name: 'Indium arsenide (InAs)',
        hallCoeff: 125
      },
      {
        name: 'Indium antimonide (InSb)',
        hallCoeff: 70
      }
    ]
  },
  {
    type: 'radio',
    id: 'thickness',
    label: 'Sensor thickness (t)',
    options: [
      {
        name: '1\u00b5m',
        thickness: 1
      },
      {
        name: '1.5\u00b5m',
        thickness: 1.5
      },
      {
        name: '2\u00b5m',
        thickness: 2
      },
      {
        name: '2.5\u00b5m',
        thickness: 2.5
      }
    ]
  },
  {
    type: 'radio',
    id: 'current',
    label: 'Current flow (I)',
    options: [
      {
        name: '25mA',
        current: 25
      },
      {
        name: '50mA',
        current: 50
      },
      {
        name: '75mA',
        current: 75
      },
      {
        name: '100mA',
        current: 100
      }
    ]
  }
]

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of magnetic field B [mT], calculate output voltage Vout [mV].',
    data: [],
    validation: []
  }
]

export const Article = () => {
  const sensorOutputVoltage: EquationProps = {
    equations: ['$V_{out} = r_H{\\cdot}\\bigg(\\cfrac{I}{t}\\cdot B\\bigg)$'],
    symbols: [
      `$r_H$ is Hall coeficient, material specific ${units.hallCoefficient},`,
      '$I$ is current flow through sensor [A],',
      '$t$ is semiconductor thickness [\u00b5m],',
      '$B$ is magnetic field [mT].'
    ]
  }
  const semiconductorMaterial: TableProps = {
    headers: [
      { label: 'Material name' },
      { label: 'Hall coefficient', unit: units.hallCoefficient }
    ],
    data: [
      ['Sillicon (Si)', 2500],
      ['Gallium arsenide (GaAs)', 2100],
      ['Indium arsenide (InAs)', 125],
      ['Indium antimonide (InSb)', 70]
    ]
  }

  return (
    <span className='text-justify text-sm'>
      <p>
        A Hall effect sensor (or simply Hall sensor) is a type of sensor which
        detects the presence and magnitude of a magnetic field using the Hall
        effect. The output voltage of a Hall sensor is directly proportional to
        the strength of the field. In a Hall sensor, a current is applied to a
        thin strip of metal. In the presence of a magnetic field perpendicular
        to the direction of the current, the charge carriers are deflected by
        the Lorentz force, producing a difference in electric potential
        (voltage) between the two sides of the strip. This voltage difference
        (the Hall voltage) is proportional to the strength of the magnetic
        field.
      </p>
      <h3>Calculating output voltage, assuming there&apos;s no field tilt</h3>
      {useParseEquation({ ...sensorOutputVoltage })}
      <h3>Semiconductor material parameters</h3>
      {useParseTable({ ...semiconductorMaterial })}
    </span>
  )
}
