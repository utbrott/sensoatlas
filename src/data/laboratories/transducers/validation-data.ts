import { round } from 'lodash'

interface GetPressureCurrent {
  minReading: number
  maxReading: number
  taskData: number[]
}

export const getPressureCurrentValidation = ({
  minReading,
  maxReading,
  taskData
}: GetPressureCurrent) => {
  const data: number[] = []

  const PRESSURE = {
    MIN: 0.885,
    MAX: 2.855
  }

  const slope = round(
    (maxReading - minReading) / (PRESSURE.MAX - PRESSURE.MIN),
    4
  )

  const slopeIntercept = round(minReading - slope * PRESSURE.MIN, 4)

  function getCurrent(pressure: number) {
    return round(slope * pressure + slopeIntercept, 2)
  }

  taskData.forEach(datapoint => {
    data.push(getCurrent(datapoint))
  })

  return [...data]
}

export const getPressureTimeConstantValidation = () => {
  const PRESSURE = {
    CHANGE: 1.575,
    START: 2.5,
    END: 0
  }

  const TIME = 0.5

  const timeConstant = round(
    TIME / Math.log(1 - PRESSURE.CHANGE / (PRESSURE.END - PRESSURE.START)),
    2
  )

  return [timeConstant]
}
