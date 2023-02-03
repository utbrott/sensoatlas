import { ConfigItem } from '@atoms/config';
import { TaskItem } from '@atoms/tasks';
import { units } from '@data/units';
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation';
import { TableProps, useParseTable } from '@hooks/use-parse-table';

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Piezoelectric accelerometer</span>
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
    type: 'select',
    id: 'material',
    label: 'Piezoelectric material',
    options: [
      {
        name: 'Barium Titanate (BaTiO3)',
        piezoCoeff: 57.5
      },
      {
        name: 'Polivinylide fluoride (PVDF)',
        piezoCoeff: 340
      },
      {
        name: 'Lead zirconate titanate (PZT)',
        piezoCoeff: 26
      }
    ]
  },
  {
    type: 'radio',
    id: 'amplitude',
    label: 'Constant amplitude',
    options: [
      {
        name: '0.2mm',
        amplitude: 0.2
      },
      {
        name: '0.5mm',
        amplitude: 0.5
      },
      {
        name: '0.7mm',
        amplitude: 0.7
      },
      {
        name: '1.0mm',
        amplitude: 1.0
      }
    ]
  },
  {
    type: 'radio',
    id: 'frequency',
    label: 'Constant frequency',
    options: [
      {
        name: '7Hz',
        frequency: 7
      },
      {
        name: '14Hz',
        frequency: 14
      },
      {
        name: '28Hz',
        frequency: 28
      }
    ]
  }
];

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of amplitude Xm [mm] and selected constant frequency, calculate output voltage Vout [mV].',
    data: [],
    validation: []
  },
  {
    prompt:
      'Given the values of frequency f [Hz] and selected constant amplitude, calculate output voltage Vout [mV].',
    data: [],
    validation: []
  }
];

export const Article = () => {
  const sensorOutputVoltage: EquationProps = {
    equations: [
      '$V_{out} = g_{33}\\cdot\\cfrac{4\\pi^2 \\cdot f^2 \\cdot X_m \\cdot m}{l\\cdot w}$'
    ],
    symbols: [
      `$g_{33}$ is piezoelectric coeficient, material specific ${units.piezoCoefficient},`,
      '$f$ is frequency [Hz],',
      '$X_m$ is maximum amplitude of movement [mm],',
      '$m$ is seismic mass, 0.1g,',
      '$l$, $w$ are piezoelectric material length, width, 18mm and 13mm,'
    ]
  };
  const piezoelectricMaterial: TableProps = {
    headers: [
      { label: 'Material name' },
      { label: 'Piezoelectric coefficient g33', unit: units.piezoCoefficient }
    ],
    data: [
      ['Barium Titanate (BaTiO3)', 57.5],
      ['Polivinylide fluoride (PVDF)', 340],
      ['Lead zirconate titanate (PZT)', 26]
    ]
  };

  return (
    <span className='text-justify text-sm'>
      <p>
        It&apos;s an accelerometer that employs the piezoelectric effect of
        certain materials to measure dynamic changes in mechanical variables
        (e.g., acceleration, vibration, and mechanical shock). Using the general
        sensing method upon which all accelerometers are based, acceleration
        acts upon a seismic mass that is restrained by a spring or suspended on
        a cantilever beam, and converts a physical force into an electrical
        signal. Before the acceleration can be converted into an electrical
        quantity it must first be converted into either a force or displacement.
        This conversion is done via the mass spring system.
      </p>
      <h3>Calculating output voltage</h3>
      {useParseEquation({ ...sensorOutputVoltage })}
      <h3>Piezoelectric material parameters</h3>
      {useParseTable({ ...piezoelectricMaterial })}
    </span>
  );
};
