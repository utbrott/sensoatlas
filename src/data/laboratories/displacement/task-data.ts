import { getRandomSet, GetRandomMinMax } from '@data/data-generation'

export const getRandomDisplacementSet = ({ min, max }: GetRandomMinMax) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 1 }, { lower: min, upper: max })
}
