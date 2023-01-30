import { round } from 'lodash'

interface GetPiezoOutputVoltage {
  constant: 'amplitude' | 'frequency'
  piezoCoefficient: number
  frequency: number
  amplitude: number
  taskData: number[]
}

export const getPiezoOutputVoltageValidation = ({
  constant,
  piezoCoefficient,
  frequency,
  amplitude,
  taskData
}: GetPiezoOutputVoltage) => {
  const data: number[] = []

  const CRYSTAL = {
    LENGTH: round(18 * 10 ** -3, 6),
    WIDTH: round(13 * 10 ** -3, 6),
    THICKNESS: round(0.16 * 10 ** -3, 6)
  }

  const SEISMIC_MASS = 0.1 * 10 ** -3

  function getOutputVoltage(
    piezoCoeff: number,
    frequency: number,
    amplitude: number
  ) {
    piezoCoeff = round(piezoCoeff * 10 ** -3, 6)
    amplitude = round(amplitude * 10 ** -3, 6)

    return round(
      ((piezoCoeff *
        4 *
        Math.PI ** 2 *
        frequency ** 2 *
        amplitude *
        SEISMIC_MASS *
        CRYSTAL.THICKNESS) /
        (CRYSTAL.LENGTH * CRYSTAL.WIDTH)) *
        10 ** 6,
      2
    )
  }

  taskData.forEach(datapoint => {
    data.push(
      getOutputVoltage(
        piezoCoefficient,
        constant === 'frequency' ? frequency : datapoint,
        constant === 'amplitude' ? amplitude : datapoint
      )
    )
  })

  return [...data]
}

interface GetCableOutputVoltage {
  weight: number
  taskData: number[]
}

export const getCableOutputVoltageValidation = ({
  weight,
  taskData
}: GetCableOutputVoltage) => {
  const data: number[] = []

  const CABLE_SENS = 300 * 10 ** -3
  const G_ACCEL = 10

  function getOutputVoltage(weight: number, height: number) {
    return round(weight * G_ACCEL * height * CABLE_SENS, 2)
  }

  taskData.forEach(datapoint => {
    data.push(getOutputVoltage(weight, datapoint))
  })

  return [...data]
}
