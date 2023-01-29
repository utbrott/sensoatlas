import { ConfigItem } from '@atoms/config'
import { TaskItem } from '@atoms/tasks'
import { units } from '@data/units'
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'

export const AmrPageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>
        Anisotropic Magneto-Resistive (AMR) sensors
      </span>
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
    id: 'hyValue',
    label: 'Value of Hy',
    options: [
      {
        name: '200A/m',
        hyValue: 200
      },
      {
        name: '400A/m',
        hyValue: 400
      },
      {
        name: '600A/m',
        hyValue: 600
      }
    ]
  }
]

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Using the selected configuration and given the values of Ix [A], calculate relative resistance change \u0394R/R [%].',
    data: [],
    validation: []
  }
]

export const AmrArticle = () => {
  const amrResistanceChange = {
    equations: [
      '$\\cfrac{\\Delta R}{R} \\cong \\cfrac{\\Delta \\rho}{\\rho}\\cdot\\cfrac{H_x}{H_y + H_k}$',
      '$H_x = W_{Hx}\\cdot I_x = 1.77\\cdot 10^3 \\cdot I_x$'
    ],
    symbols: [
      '$H_x, H_y$ is magnetic field strength in a given direction,',
      '$H_k$ is anisotropic field, 3 Oersted $\\approx$ 238.731$\\big[{A}{\\cdot}{m^{-1}}\\big]$',
      '${\\Delta\\rho}/{\\rho}$ is magnetoresitive constant, 2%'
    ]
  }

  return (
    <span className='text-justify text-sm'>
      <p>
        Magnetoresistance is the tendency of a material (often ferromagnetic) to
        change the value of its electrical resistance in an externally-applied
        magnetic field. There are a variety of effects that can be called
        magnetoresistance. Anisotropic magnetoresistance (AMR) is a property of
        a material in which a dependence of electrical resistance on the angle
        between the direction of electric current and direction of magnetization
        is observed.
      </p>
      <h3>
        Calculating relative resistance change, assuming that{' '}
        {'\u03c6 = 45\u00b0'}{' '}
      </h3>
      {useParseEquation({ ...amrResistanceChange })}
    </span>
  )
}
