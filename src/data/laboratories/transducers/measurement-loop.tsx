import { ConfigItem } from '@atoms/config';
import { TaskItem } from '@atoms/tasks';
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation';
import Image from 'next/image';

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
  );
};

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
];

export const taskFields: TaskItem[] = [
  {
    prompt:
      'Given the values of voltage U or resistance R (depending on what transducer type is selected) at 25% and 75% of range, calculate lower and upper measurement limits (U/R).',
    data: [],
    validation: []
  },
  {
    prompt:
      'Given the values of resistance R [\u03a9], calculate the output resistance Rout [\u03a9].',
    data: [],
    validation: []
  }
];

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
  };

  const resistanceTransducer: EquationProps = {
    equations: ['$R_{out} = \\cfrac{R_1 I_1 - R_{2} I_{2}}{I_1 - I_{2}}$'],
    symbols: [
      '$y$ is voltage or resistance,',
      '$R_{1}$, $R_{2}$ are measured resistance values, as shown on graph,',
      '$I_{1}$, $I_{2}$ are current values, accordingly for $R_{1}$, $R_{2}$, as shown on graph.'
    ]
  };

  return (
    <span className='text-justify text-sm'>
      <p>
        Measurement (current) loops are commonly used for electronic signalling,
        with the two values of lower and upper limit (0-5, 4-20mA, etc.)
        representing 0-100% of the range of measurement or control. These loops
        are used both for carrying sensor information from field
        instrumentation, and carrying control signals to the process modulating
        devices, such as a valve.
      </p>
      <h3>Forming the processing characteristic</h3>
      <p>
        The constants should be rounded to 4th decimal place for optimal
        accuracy. Then the resulting formula will allow for calculation of any
        current value corresponding to a set voltage or resistance or in the
        other direction - value of voltage or resistance that corresponds to a
        set current.
      </p>
      <p>
        Remember that the range calculated in this laboratory for the resistance
        starts at base value of 100{'\u03a9'}, which is measured at 0{'\u00b0'}
        C. The range <b>shouldn&apos;t</b> start at 0{'\u03a9'}.
      </p>
      {useParseEquation({ ...processingChar })}
      <h3>Calculating the output resistance of Unifed R/I transducer</h3>
      <p>Graph that represents the measurements done.</p>
      <div className='mb-4 flex w-full items-center justify-center rounded-md bg-white'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/charts/measurement-loop-transducer-graph.png'
          alt='schematic'
          className='aspect-video h-full'
        />
      </div>
      <p>The equation for calculate the output resistance is shown below:</p>
      {useParseEquation({ ...resistanceTransducer })}
    </span>
  );
};
