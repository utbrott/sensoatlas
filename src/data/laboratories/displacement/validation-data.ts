import { round } from 'lodash'

interface LvdtVoltageValidation {
  turns: number
  voltage: number
  frequency: number
  taskData: number[]
}

export const getLvdtVoltageValidation = ({
  turns,
  voltage,
  frequency,
  taskData
}: LvdtVoltageValidation) => {
  const RESISTANCE = 10 * 10 ** 3
  const VACUUM = 4 * Math.PI * 10 ** -7
  const RADII_RATIO = 2
  const PRIMARY_LENGTH = 20
  const SECONDARY_LENGTH = PRIMARY_LENGTH / 2

  const getOutputVoltage = (
    turns: number,
    voltage: number,
    frequency: number,
    displacement: number
  ) => {
    const inputCurrent = voltage / RESISTANCE
    const windingValue = 0.5 * turns ** 2
    const vacuumCoeff = 4 * Math.PI * VACUUM
    const coilRatio =
      (PRIMARY_LENGTH / (3 * SECONDARY_LENGTH)) * Math.log10(RADII_RATIO)

    const displacmentRatio = round(
      1 - displacement ** 2 / (2 * PRIMARY_LENGTH ** 2),
      5
    )

    return round(
      frequency *
        inputCurrent *
        vacuumCoeff *
        windingValue *
        displacement *
        coilRatio *
        displacmentRatio,
      2
    )
  }

  const data: number[] = []
  taskData.forEach(value => {
    data.push(getOutputVoltage(turns, voltage, frequency, value))
  })

  return [...data]
}
