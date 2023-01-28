import { round } from 'lodash'

const getRandomInRange = (min: number, max: number, step?: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  if (step) {
    const valuesCount = Math.ceil(max / step)
    return Math.floor(Math.random() * valuesCount) * step + min
  }

  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomSet = (
  size: number,
  gen: { min: number; max: number; step?: number },
  limits?: { lower?: number; upper?: number }
) => {
  const set = new Set<number>()

  if (typeof limits?.lower !== ('undefined' || null)) {
    limits.lower = Math.ceil(limits.lower)
    set.add(limits.lower)
  }

  for (let i = set.size; set.size < (limits?.upper ? size - 1 : size); i++) {
    set.add(round(getRandomInRange(gen.min, gen.max, gen.step), 2))
  }

  if (typeof limits?.upper !== ('undefined' || null)) {
    limits.upper = Math.floor(limits.upper)
    set.add(limits.upper)
  }

  return [...Array.from(set)]
}
