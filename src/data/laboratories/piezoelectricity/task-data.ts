import { round } from 'lodash'
import { GetRandomMinMax, getRandomSet } from '@data/data-generation'

export const getRandomAmplitudeSet = ({ min, max }: GetRandomMinMax) => {
  min = round(min, 2)
  max = round(max, 2)

  return getRandomSet(5, { min: min, max: max, step: 0.1 })
}

export const getRandomFrequencySet = ({ min, max }: GetRandomMinMax) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 2 })
}

export const getRandomHeight = ({ min, max }: GetRandomMinMax) => {
  min = round(min, 2)
  max = round(max, 2)

  return getRandomSet(5, { min, max, step: 0.05 })
}
