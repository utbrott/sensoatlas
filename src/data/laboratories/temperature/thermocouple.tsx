import { ConfigItem } from '@atoms/config'
import { TaskItem } from '@atoms/tasks'
import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'
import { TableProps, useParseTable } from '@hooks/use-parse-table'
import { units } from '@data/units'

export const ThermocouplePageHeader = () => {
  return (
    <div className='space-y-2'>
      <span className='text-lg font-medium'>Thermocouples</span>
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
    id: 'sensor',
    label: 'Thermocouple type',
    options: [
      {
        name: 'Type J: Iron-Constantan',
        seebeckCoeff: 51,
        density: 8535,
        heatCapacity: 345,
        conductivity: 46
      },
      {
        name: 'Type K: Chromel-Alumel',
        seebeckCoeff: 40,
        density: 8738,
        heatCapacity: 380,
        conductivity: 35
      },
      {
        name: 'Type R: Platinum-Rhodium',
        seebeckCoeff: 12,
        density: 16628,
        heatCapacity: 99,
        conductivity: 55
      },
      {
        name: 'Type T: Copper-Constantan',
        seebeckCoeff: 60,
        density: 8902,
        heatCapacity: 316,
        conductivity: 160
      },
      {
        name: 'Type E: Chromel-Constantan',
        seebeckCoeff: 40,
        density: 8825,
        heatCapacity: 336,
        conductivity: 33
      }
    ]
  },
  {
    type: 'select',
    id: 'refTemperature',
    label: 'Reference temperature (T0)',
    options: [
      {
        name: `0${units.celcius}`,
        refTemperature: 0
      },
      {
        name: `5${units.celcius}`,
        refTemperature: 5
      },
      {
        name: `10${units.celcius}`,
        refTemperature: 10
      },
      {
        name: `15${units.celcius}`,
        refTemperature: 15
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
]

export const taskFields: TaskItem[] = [
  {
    prompt: `Given the values of temperature T [${units.celcius}], calculate the output voltage [mV].`,

    data: [],
    validation: []
  },
  {
    prompt:
      'Based on selected sensor configuration, calculate time constant $\\tau$ [s] of sensor (bare, sheathed and in thermowell).',
    validation: []
  }
]

export const ThermocoupleArticle = () => {
  const sensorOutputVoltage: EquationProps = {
    equations: ['$V_{\\text{out}}=S_{AB}\\cdot(T_1 - T_0)$'],
    symbols: [
      '$S_{AB}$ - Seebecks coefficient [$\\mu V\\cdot K^{-1}$];',
      `$T_1$ is environment temperature [${units.celcius}],`,
      `$T_0$ is reference temperature [${units.celcius}],`
    ]
  }

  const sensorDataTab: TableProps = {
    headers: [
      {
        label: 'Thermocouple type',
        unit: ''
      },
      {
        label: 'Seebecks coefficient',
        unit: '[$\\mu V\\cdot K^{-1}$]'
      },
      {
        label: 'Density',
        unit: '[$kg\\cdot m^{-3}$]'
      },
      {
        label: 'Heat capacity',
        unit: '[$J\\cdot (kg ^\\circ C)^{-1}$]'
      },
      {
        label: 'Thermal conductivity',
        unit: '[$W\\cdot (mK)^{-1}$]'
      }
    ],
    data: [
      ['Type J', 51, 8535, 345, 46],
      ['Type K', 40, 8738, 380, 35],
      ['Type R', 12, 16628, 99, 55],
      ['Type T', 60, 8902, 316, 160],
      ['Type E', 40, 8825, 336, 33]
    ]
  }

  const timeConstantEq: EquationProps = {
    equations: ['$\\tau=\\cfrac{x}{K}\\cdot\\rho\\cdot l\\cdot C$'],
    symbols: [
      '$x$ is thickness [mm],',
      `$K$ is thermal conductivity ${units.thermalConductivity},`,
      `$\\rho$ is density ${units.density}`,
      `$C$ is heat capacity ${units.heatCapacity}`,
      '$l$ is length, 15mm,'
    ]
  }

  const timeConstantCasesEq: EquationProps = {
    equations: [
      '$\\tau_{\\textsf{bare}}=\\tau$',
      '$\\tau_{\\textsf{sheathed}}=\\tau_{\\textsf{bare}}+\\tau_{\\textsf{air}}+\\tau_{\\textsf{case}}$',
      '$\\tau_{\\textsf{thermowell}}=\\tau_{\\textsf{sheathed}}+\\tau_{\\textsf{fill}}+\\tau_{\\textsf{case}}$'
    ],
    symbols: [
      'Thickness of bare element $x_{\\textsf{bare}}$ is 1.25mm,',
      'Thickness of air layer inside $x_{\\textsf{air}}$ is 0.2mm,',
      'Thickness of probe filling $x_{\\textsf{fill}}$ is 2.5mm,',
      '$x_{\\textsf{case}}$ is thickness of protective case (sheath, thermowell).'
    ]
  }

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
  }

  return (
    <span className='text-justify text-sm'>
      <p>
        Sensors used to measure temperature. Typically consisting of two
        dissimilar electrical conductors forming an electrical junction. A
        thermocouple produces a temperature-dependent voltage as a result of the
        Seebeck effect, and this voltage can be interpreted to measure
        temperature.
      </p>
      <h3>Calculating resistance change</h3>
      <p>
        With thermocouples temperature measurement is done by measuring
        sensor&apos;s output voltage with it&apos;s surrouding temperature
        change. This gives sensor&apos;s static response characteristic:
      </p>
      {useParseEquation({ ...sensorOutputVoltage })}
      <h3>Calculating time constant</h3>
      <p>
        Thermocouples also have dynamic response characteric, which shows how
        fast sensor stabilizes after sudden change of temperature in it&apos;s
        surroudings.
      </p>
      {useParseEquation({ ...timeConstantEq })}
      <h3>Calculating time constant in different cases:</h3>
      <p>
        Using the equation listed above, calculate time constant of each part,
        then sum them:
      </p>
      {useParseEquation({ ...timeConstantCasesEq })}
      <h3>Material constants</h3>
      <h4>Sensor materials:</h4>
      {useParseTable({ ...sensorDataTab })}
      <h4>Protective casing materials:</h4>
      {useParseTable({ ...fillerMaterialDataTab })}
    </span>
  )
}
