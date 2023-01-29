import { round } from 'lodash'
import { getRandomSet } from '@data/data-generation'

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

  return getRandomSet(5, { min, max, step: 5 }, { lower: min, upper: max })
}

type SensorType = 'rtd' | 'thermocouple'

interface GetTemperatureSlopes {
  sensor: SensorType
  timeConstantValues: number[]
}

interface GetTemperatureValue {
  time: number
  timeConstantValue: number
  sensor: SensorType
}

export const getTemperatureSlopes = ({
  sensor,
  timeConstantValues
}: GetTemperatureSlopes) => {
  const getTemperatureValue = ({
    time,
    timeConstantValue,
    sensor
  }: GetTemperatureValue) => {
    const INITIAL_TEMPERATURE = 0
    const surroudingTemperature = sensor === 'rtd' ? 50 : 300

    return round(
      surroudingTemperature -
        (surroudingTemperature - INITIAL_TEMPERATURE) *
          Math.exp((time / timeConstantValue) * -1),
      2
    )
  }

  const bareTimeConstantSlope: number[] = []
  const sheathedTimeConstantSlope: number[] = []
  const thermowellTimeConstantSlope: number[] = []

  const SEC_IN_MIN = 60
  const time: number[] = []

  for (let i = 0; i <= SEC_IN_MIN; i++) {
    time[i] = i
  }

  time.forEach(tick => {
    bareTimeConstantSlope.push(
      getTemperatureValue({
        time: tick,
        timeConstantValue: timeConstantValues[0],
        sensor: sensor
      })
    )

    sheathedTimeConstantSlope.push(
      getTemperatureValue({
        time: tick,
        timeConstantValue: timeConstantValues[1],
        sensor: sensor
      })
    )

    thermowellTimeConstantSlope.push(
      getTemperatureValue({
        time: tick,
        timeConstantValue: timeConstantValues[2],
        sensor: sensor
      })
    )
  })

  return {
    xvalue: time,
    yvalues: [
      bareTimeConstantSlope,
      sheathedTimeConstantSlope,
      thermowellTimeConstantSlope
    ]
  }
}
