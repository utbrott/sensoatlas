import { round } from 'lodash'

interface MagnetoresistanceValidationFn {
  taskData: number[]
  hyValue?: number
}

export const getResistanceChangeValidation = ({
  hyValue,
  taskData
}: MagnetoresistanceValidationFn) => {
  const CONST_VALUES = {
    WHX: 1.83,
    WHY: 1.77,
    HK: 238.731,
    MRES_COEFF: 0.02
  }
  const data: number[] = []
  const hData: number[] = []

  const getFieldStrength = (current: number) => {
    return round(current * 10 ** 3 * CONST_VALUES.WHX, 2)
  }

  const getResistanceChange = ({
    hxValue,
    hyValue
  }: {
    hxValue: number
    hyValue: number
  }) => {
    return round(
      CONST_VALUES.MRES_COEFF * 100 * (hxValue / (hyValue + CONST_VALUES.HK)),
      2
    )
  }

  taskData.forEach(datapoint => {
    hData.push(getFieldStrength(datapoint))
  })

  console.log(hData)

  hData.forEach(datapoint => {
    data.push(
      getResistanceChange({
        hxValue: datapoint,
        hyValue
      })
    )
  })

  return [...data]
}

interface GetHallOutputVoltage {
  hallCoefficient: number
  thickness: number
  current: number
  taskData: number[]
}

export const getHallOutputVoltage = ({
  hallCoefficient,
  thickness,
  current,
  taskData
}: GetHallOutputVoltage) => {
  const data: number[] = []

  current = current * 10 ** -3
  thickness = thickness * 10 ** -6

  function getVoltage(
    hallCoeff: number,
    thickness: number,
    current: number,
    magneticField: number
  ) {
    return round(
      hallCoeff * (current / thickness) * (magneticField * 10 ** -3) * 10 ** -6,
      2
    )
  }

  taskData.forEach(datapoint => {
    data.push(getVoltage(hallCoefficient, thickness, current, datapoint))
  })

  return [...data]
}
