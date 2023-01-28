import { getRandomSet } from '@data/data-generation'

interface GetRandomDisplacementSet {
  min: number
  max: number
}

export const getRandomDisplacementSet = ({
  min,
  max
}: GetRandomDisplacementSet) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 1 }, { lower: min, upper: max })
}
