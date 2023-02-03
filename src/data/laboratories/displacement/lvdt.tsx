import { ConfigItem } from '@atoms/config';
import { TaskItem } from '@atoms/tasks';
import { units } from '@data/units';
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation';

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>
        Linear Variable Differential Transformers (LVDTs)
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
  );
};

export const configFields: ConfigItem[] = [
  {
    type: 'radio',
    id: 'turns',
    label: 'Turns number in winding of primary coil (Np)',
    options: [
      {
        name: '1000',
        turns: 1000
      },
      {
        name: '1500',
        turns: 1500
      },
      {
        name: '2000',
        turns: 2000
      }
    ]
  },
  {
    type: 'radio',
    id: 'voltage',
    label: 'Source voltage (Vin)',
    options: [
      {
        name: '5V',
        voltage: 5
      },
      {
        name: '7.5V',
        voltage: 7.5
      },
      {
        name: '10V',
        voltage: 10
      }
    ]
  },
  {
    type: 'radio',
    id: 'frequency',
    label: 'Source frequency',
    options: [
      {
        name: '1000Hz',
        frequency: 1000
      },
      {
        name: '3000Hz',
        frequency: 3000
      },
      {
        name: '5000Hz',
        frequency: 5000
      }
    ]
  }
];

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of displacement x [mm], calculate the output voltage Vout [mV]',

    data: [],
    validation: []
  }
];

export const Article = () => {
  const lvdtOutputVoltage: EquationProps = {
    equations: [
      '$V_{out}=f\\cdot I_p\\cdot\\bigg(4\\pi{\\cdot}\\mu_0{\\cdot}N_p N_s{\\cdot}l_p\\cdot\\cfrac{x}{3l_s}\\log{\\Big(\\cfrac{r_o}{r_i}\\Big)}\\bigg)\\bigg(1-\\cfrac{x^2}{2l_p^2}\\bigg)$',
      '$V_{out}=\\cfrac{f{\\cdot}V_{in}}{R}\\cdot\\bigg(4\\pi{\\cdot}\\mu_0\\cdot 0.5N_p^2\\cdot l_p\\cdot\\cfrac{x}{3l_s}\\log{\\Big(\\cfrac{r_o}{r_i}\\Big)}\\bigg)\\bigg(1-\\cfrac{x^2}{2l_p^2}\\bigg)$'
    ],
    symbols: [
      '$f$ is source frequency [Hz],',
      '$I_p$ is current induced in the primary coil [A],',
      '$V_{in}$ is input voltage [V],',
      `$R$ is resistance, 10 ${units.kohmsUnicode},`,
      '$N_p$ is number of turns in primary winding,',
      '$N_s$ is number of turns in secondary windings, $0.5{\\cdot}N_p$,',
      `$\\mu_0$ is vacuum permeability, $4\\pi\\cdot 10^{-7}$ ${units.permeability},`,
      '$x$ is core displacement [mm],',
      '$l_p$ is length of primary winding, 20mm',
      '$l_s$ is length of each secondary winding, 10mm,',
      '${r_{o}}/{r_{i}}$ is outer to inner coil winding radius ratio, here - 2.'
    ]
  };

  return (
    <span className='text-justify text-sm'>
      <p>
        Type of electrical transformer used for measuring linear displacement
        (position). LVDTs are robust, absolute linear position/displacement
        transducers; inherently frictionless, they have a virtually infinite
        cycle life when properly used. As AC operated, LVDTs do not contain any
        electronics. The LVDT converts a position or linear displacement from a
        mechanical reference (zero or null position) into a proportional
        electrical signal containing phase (for direction) and amplitude (for
        distance) information.
      </p>
      <h3>Calculating the output voltage</h3>
      <p>
        In LVDTs the primary coil gets powered using alternating voltage of
        chosen frequency. In both of the secondary windings there is voltage
        being induced, which values are dependant of core location inside the
        system. When the core is in the middle, the output voltage is zero,
        otherwise it&apos;s a difference between induced voltages on the
        secodary coils. The final output voltage can be calculated using formula
        given below.{' '}
      </p>
      {useParseEquation({ ...lvdtOutputVoltage })}
    </span>
  );
};
