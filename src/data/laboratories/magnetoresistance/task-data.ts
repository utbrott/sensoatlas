import { getRandomSet, GetRandomMinMax } from '@data/data-generation'

export const getRandomCurrentSet = ({ min, max }: GetRandomMinMax) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 0.1, withNegatives: true })
}

export const getRandomMagneticField = ({ min, max }: GetRandomMinMax) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 1, withNegatives: true })
}
