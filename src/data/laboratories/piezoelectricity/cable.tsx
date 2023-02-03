import { ConfigItem } from '@atoms/config';
import { TaskItem } from '@atoms/tasks';
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation';

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Piezoelectric cable</span>
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
  );
};

export const configFields: ConfigItem[] = [
  {
    type: 'radio',
    id: 'weight',
    label: 'Weight mass',
    options: [
      {
        name: '5g',
        weight: 5
      },
      {
        name: '10g',
        weight: 10
      },
      {
        name: '15g',
        weight: 15
      },
      {
        name: '20g',
        weight: 20
      }
    ]
  }
];

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of height h [m], calculate the output voltage Vout [V] from the impulse.',
    data: [],
    validation: []
  }
];

export const Article = () => {
  const sensorOutputVoltage: EquationProps = {
    equations: ['$E_i = mgh$', '$V_{out} = E_i\\cdot S$'],
    symbols: [
      `$m$ is weight's mass [g],`,
      '$g$ is gravitational acceleration, 10 $\\big[m \\cdot s^{-2}\\big]$,',
      '$h$ is height [m],',
      "$S$ is cable's sensitivity, 300 $\\big[mV\\cdot mJ^{-1}\\big]$,"
    ]
  };

  return (
    <span className='text-justify text-sm'>
      <p>
        It&apos;s a measurement device that employs the piezoelectric effect of
        certain materials to measure dynamic changes in mechanical variables
        (e.g., acceleration, vibration, and mechanical shock). Using the impulse
        energy that&apos;s coming from the material shock induced by the falling
        weight, it is possible to calculate the height of the fall using the
        output voltage of the system.
      </p>
      <h3>Calculating the output voltage from impulse energy</h3>
      {useParseEquation({ ...sensorOutputVoltage })}
    </span>
  );
};
