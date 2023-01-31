import { getRandomSet, GetRandomMinMax } from '@data/data-generation'
import { round } from 'lodash'

export const getRandomPressure = ({ min, max }: GetRandomMinMax) => {
  min = round(min, 2)
  max = round(max, 2)

  return getRandomSet(5, { min, max, step: 0.105 })
}

interface GetPressureSlope {
  timeConstant: number
}

export const getPressureSlope = ({ timeConstant }: GetPressureSlope) => {
  const PRESSURE = {
    CHANGE: 1.575,
    START: 2.5,
    END: 0
  }

  function getSlopeValue(time: number, timeConstant: number) {
    return round(
      PRESSURE.START -
        (PRESSURE.END - PRESSURE.START) * Math.exp((time / timeConstant) * -1),
      2
    )
  }

  const time: number[] = []

  for (let i = 0; i <= 30; i++) {
    time[i] = i
  }

  const pressureTimeConstant: number[] = []

  time.forEach(tick => {
    if (tick < 15) {
      pressureTimeConstant.push(getSlopeValue(0, timeConstant))
      return
    }

    pressureTimeConstant.push(getSlopeValue(tick - 15, timeConstant))
  })

  return {
    xvalue: time,
    yvalues: pressureTimeConstant
  }
}
