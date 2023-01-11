import { round } from 'lodash'
import { getRandomSet } from '@utils/data-generation'

interface GetRandomTemperatureSet {
  min: number
  max: number
}

export const getRandomTemperatureSet = ({
  min,
  max
}: GetRandomTemperatureSet) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(
    5,
    { min, max, step: 5 },
    { lower: min - 5, upper: max + 5 }
  )
}
