import { getRandomSet } from '@data/data-generation'

interface GetRandomCurrentSet {
  min: number
  max: number
}

export const getRandomCurrentSet = ({ min, max }: GetRandomCurrentSet) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 0.1, withNegatives: true })
}

interface GetRandomMagneticField {
  min: number
  max: number
}

export const getRandomMagneticField = ({
  min,
  max
}: GetRandomMagneticField) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return getRandomSet(5, { min, max, step: 1, withNegatives: true })
}
