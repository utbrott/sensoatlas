import { EquationProps, useParseEquation } from '@hooks/use-parse-equation'
import { TableProps, useParseTable } from '@hooks/use-parse-table'
import { ConfigItem } from '@utils/initial-config-creator'
import { units } from '@data/units'

export const Article = () => {
  const sensorResistanceEq: EquationProps = {
    equations: ['R_t=R(1+\\alpha(T-T_{ref}))'],
    symbols: [
      `$R$ is base resistance ${units.ohms},`,
      '$\\alpha$ is temperature coefficient,',
      `$T$ is surroundings temperature [${units.celcius}],`,
      `$T_{ref}$ is reference temperature, 0${units.celcius}.`
    ]
  }

  const sensorDataTab: TableProps = {
    headers: [
      { label: 'Material name' },
      { label: 'Temperature coeff.' },
      { label: 'Density', unit: units.density },
      { label: 'Heat capacity', unit: units.heatCapacity },
      { label: 'Thermal conducivity', unit: units.thermalConductivity }
    ],
    data: [
      ['Platinum (Pt)', 0.0037, 21450, 133, 69],
      ['Copper (Cu)', 0.0041, 8960, 385, 384],
      ['Nickel (Ni)', 0.0062, 8908, 440, 106],
      ['Tungsten (W)', 0.0045, 21450, 134, 173]
    ]
  }

  const timeConstantEq: EquationProps = {
    equations: ['\\tau=\\cfrac{x}{K}\\cdot\\rho\\cdot{l}\\cdot{C}'],
    symbols: [
      '$x$ is thickness [mm],',
      `$K$ is thermal conductivity ${units.thermalConductivity},`,
      `$\\rho$ is density ${units.density},`,
      '$l$ is length (of protective sleeve), 15mm,',
      `$C$ is heat capacity ${units.heatCapacity}.`
    ]
  }

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
    <>
      <h2>Intro</h2>
      <p>
        Sensors used to measure temperature. Many RTD elements consist of a
        length of fine wire wrapped around a heat-resistant ceramic or glass
        core but other constructions are also used. The RTD wire is a pure
        material, typically platinum (Pt), nickel (Ni), or copper (Cu). The
        material has an accurate resistance/temperature relationship which is
        used to provide an indication of temperature.
      </p>
      <h2>Calculating resistance change</h2>
      <p>
        With RTDs temperature measurement is done by measuring sensor&apos;s
        resistance with it&apos;s surrouding temperature change. This gives
        sensor&apos;s static response characteristic:
      </p>
      {useParseEquation({ ...sensorResistanceEq })}
      <h2>Calculating time constant</h2>
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
      <h2>Material constants</h2>
      <h4>Sensor materials:</h4>
      {useParseTable({ ...sensorDataTab })}
      <h4>Protective casing materials:</h4>
      {useParseTable({ ...fillerMaterialDataTab })}
    </>
  )
}
