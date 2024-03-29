import { ConfigItem } from '@atoms/config';
import { TaskItem } from '@atoms/tasks';
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation';
import { TableProps, useParseTable } from '@hooks/use-parse-table';
import { units } from '@data/units';

export const PageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>
        Resistance Temperature Detectors (RTDs)
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
    type: 'select',
    id: 'sensor',
    label: 'Inner wire material',
    options: [
      {
        name: 'Platinium',
        tempCoeff: 0.00385,
        density: 21450,
        heatCapacity: 133,
        conductivity: 69.1
      },
      {
        name: 'Copper',
        tempCoeff: 0.004041,
        density: 8960,
        heatCapacity: 385,
        conductivity: 384.1
      },
      {
        name: 'Nickel',
        tempCoeff: 0.00617,
        density: 8908,
        heatCapacity: 440,
        conductivity: 106
      },
      {
        name: 'Tungsten',
        tempCoeff: 0.0045,
        density: 19300,
        heatCapacity: 134,
        conductivity: 173
      }
    ]
  },
  {
    type: 'radio',
    id: 'resistance',
    label: 'Resistance (R)',
    options: [
      {
        name: `100${units.ohmsUnicode}`,
        resistance: 100
      },
      {
        name: `500${units.ohmsUnicode}`,
        resistance: 500
      },
      {
        name: `1000${units.ohmsUnicode}`,
        resistance: 1000
      }
    ]
  },
  {
    type: 'radio',
    id: 'thickness',
    label: 'Sheath/Thermowell thickness',
    options: [
      {
        name: '0.50mm',
        thickness: 0.5
      },
      {
        name: '0.75mm',
        thickness: 0.75
      },
      {
        name: '1.00mm',
        thickness: 1.0
      }
    ]
  },
  {
    type: 'radio',
    id: 'filler',
    label: 'Thermowell filling material',
    options: [
      {
        name: 'MgO Powder',
        density: 3580,
        heatCapacity: 877,
        conductivity: 26.8
      },
      {
        name: 'Sillicon Compound',
        density: 3210,
        heatCapacity: 800,
        conductivity: 3
      }
    ]
  }
];

export const taskFields: TaskItem[] = [
  {
    prompt: `Given the values of temperature T [${units.celcius}], calculate sensors resistance Rt ${units.ohms}.`,

    data: [],
    validation: []
  },
  {
    prompt:
      'Based on selected sensor configuration, calculate time constant $\\tau$ [s] of sensor (bare, sheathed and in thermowell).',
    validation: []
  }
];

export const Article = () => {
  const sensorResistanceEq: EquationProps = {
    equations: ['R_t=R(1+\\alpha(T-T_{ref}))'],
    symbols: [
      `$R$ is base resistance ${units.ohms},`,
      `$\\alpha$ is temperature coefficient ${units.temperatureCoefficient},`,
      `$T$ is surroundings temperature [${units.celcius}],`,
      `$T_{ref}$ is reference temperature, 0${units.celcius}.`
    ]
  };

  const sensorDataTab: TableProps = {
    headers: [
      { label: 'Material name' },
      { label: 'Temperature coeff.', unit: units.temperatureCoefficient },
      { label: 'Density', unit: units.density },
      { label: 'Heat capacity', unit: units.heatCapacity },
      { label: 'Thermal conducivity', unit: units.thermalConductivity }
    ],
    data: [
      ['Platinum (Pt)', 0.00385, 21450, 133, 69],
      ['Copper (Cu)', 0.0041, 8960, 385, 384],
      ['Nickel (Ni)', 0.0062, 8908, 440, 106],
      ['Tungsten (W)', 0.0045, 21450, 134, 173]
    ]
  };

  const timeConstantEq: EquationProps = {
    equations: ['\\tau=\\cfrac{x}{K}\\cdot\\rho\\cdot{l}\\cdot{C}'],
    symbols: [
      '$x$ is thickness [mm],',
      `$K$ is thermal conductivity ${units.thermalConductivity},`,
      `$\\rho$ is density ${units.density},`,
      '$l$ is length (of protective sleeve), 15mm,',
      `$C$ is heat capacity ${units.heatCapacity}.`
    ]
  };

  const timeConstantCasesEq: EquationProps = {
    equations: [
      '$\\tau_{\\textsf{bare}}=\\tau$',
      '$\\tau_{\\textsf{sheathed}}=\\tau_{\\textsf{bare}}+\\tau_{\\textsf{air}}+\\tau_{\\textsf{case}}$',
      '$\\tau_{\\textsf{thermowell}}=\\tau_{\\textsf{sheathed}}+\\tau_{\\textsf{fill}}+\\tau_{\\textsf{case}}$'
    ],
    symbols: [
      'Thickness of bare element $x_{\\textsf{bare}}$ is 2mm,',
      'Thickness of air layer inside $x_{\\textsf{air}}$ is 0.2mm,',
      'Thickness of probe filling $x_{\\textsf{fill}}$ is 2.5mm,',
      '$x_{\\textsf{case}}$ is thickness of protective case (sheath, thermowell).'
    ]
  };

  const fillerMaterialDataTab: TableProps = {
    headers: [
      { label: 'Material name' },
      { label: 'Density', unit: units.density },
      { label: 'Heat capacity', unit: units.heatCapacity },
      { label: 'Thermal conducivity', unit: units.thermalConductivity }
    ],
    data: [
      ['MgO Powder', 3580, 877, 26.8],
      ['Silicon Compound', 3210, 800, 3],
      ['Air', 1.225, 1005, 0.025],
      ['SS304 (Casing)', 8030, 500, 21.4]
    ]
  };

  return (
    <span className='text-justify text-sm'>
      <p>
        Sensors used to measure temperature. Many RTD elements consist of a
        length of fine wire wrapped around a heat-resistant ceramic or glass
        core but other constructions are also used. The RTD wire is a pure
        material, typically platinum (Pt), nickel (Ni), or copper (Cu). The
        material has an accurate resistance/temperature relationship which is
        used to provide an indication of temperature.
      </p>
      <h3>Calculating resistance change</h3>
      <p>
        With RTDs temperature measurement is done by measuring sensor&apos;s
        resistance with it&apos;s surrouding temperature change. This gives
        sensor&apos;s static response characteristic:
      </p>
      {useParseEquation({ ...sensorResistanceEq })}
      <h3>Calculating time constant</h3>
      <p>
        Resistance temperature detectors also have dynamic response characteric,
        which shows how fast sensor stabilizes after sudden change in it&apos;s
        surroudings.
      </p>
      {useParseEquation({ ...timeConstantEq })}
      <h4>Calculating time constant in different cases:</h4>
      <p>
        Using the equation listed above calculate time constant of each part,
        then sum them:
      </p>
      {useParseEquation({ ...timeConstantCasesEq })}
      <h3>Material constants</h3>
      <h4>Sensor materials:</h4>
      {useParseTable({ ...sensorDataTab })}
      <h4>Protective casing materials:</h4>
      {useParseTable({ ...fillerMaterialDataTab })}
    </span>
  );
};
