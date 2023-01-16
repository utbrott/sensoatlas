import { round } from 'lodash'

function getResistanceChange(
  strain: number,
  factor: number,
  resistance?: number
) {
  return resistance * strain * factor
}

function getTemperatureEffect(
  temperature: { coeff: number; value: number },
  resistance: number
) {
  const REF_TEMPERATURE = 20
  return resistance * temperature.coeff * (temperature.value - REF_TEMPERATURE)
}

function getOutputVoltage(
  multiplier: number,
  voltage: number,
  strain: number,
  factor: number,
  resistance: number,
  temperature?: { coeff: number; value: number }
) {
  const resistanceDelta: number = getResistanceChange(
    strain,
    factor,
    resistance
  )

  if (temperature) {
    const temperatureEffect: number = getTemperatureEffect(
      temperature,
      resistance
    )

    return round(
      multiplier *
        voltage *
        ((resistanceDelta + temperatureEffect) / resistance),
      2
    )
  }

  return round(multiplier * voltage * (resistanceDelta / resistance), 2)
}

function getNewResistance(
  resistance: number,
  strain: number,
  factor: number,
  temperature: { coeff: number; value: number }
) {
  strain = strain / 10 ** 6
  const resistanceDelta: number = getResistanceChange(
    strain,
    factor,
    resistance
  )
  const temperatureEffect: number = getTemperatureEffect(
    temperature,
    resistance
  )

  return round(resistance + resistanceDelta + temperatureEffect, 2)
}

interface ValidationFnProps {
  material: {
    name: string
    gaugeFactor: number
    modulus: number
    tempCoeff: number
  }
  voltage: number
  resistance: number
  bridge: { name: string; multiplier: number }
  taskData: number[]
  withTemperature?: boolean
}

export const getStrainValidationData = ({
  material,
  voltage,
  resistance,
  bridge,
  taskData,
  withTemperature
}: ValidationFnProps) => {
  const STATIC_STRAIN = 1.5
  const STATIC_TEMPERATURE = 20

  const data: number[] = []

  if (withTemperature) {
    taskData.forEach(dataPoint => {
      const value =
        bridge.name.toLowerCase() === 'quater' ? dataPoint : STATIC_TEMPERATURE

      data.push(
        getOutputVoltage(
          bridge.multiplier,
          voltage,
          STATIC_STRAIN,
          material.gaugeFactor,
          resistance,
          { coeff: material.tempCoeff, value }
        )
      )
    })

    return [...data]
  }

  taskData.forEach(value => {
    data.push(
      getOutputVoltage(
        bridge.multiplier,
        voltage,
        value,
        material.gaugeFactor,
        resistance
      )
    )
  })

  return [...data]
}

export const getNewGaugeResistance = ({
  material,
  voltage,
  resistance,
  bridge,
  taskData,
  withTemperature
}: ValidationFnProps) => {
  const STATIC_STRAIN = 1.5
  const STATIC_TEMPERATURE = 20

  const data: number[] = []

  taskData.forEach(dataPoint => {
    const value = bridge.name === 'quater' ? dataPoint : STATIC_STRAIN

    data.push(
      getNewResistance(resistance, STATIC_STRAIN, material.gaugeFactor, {
        coeff: material.tempCoeff,
        value
      })
    )
  })

  return [...data]
}
