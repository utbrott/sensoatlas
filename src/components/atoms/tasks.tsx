import { useEffect, useState } from 'react'
import { Form, useZodForm } from '@ui/forms'
import { Button } from '@ui/button'
import { object, number } from 'zod'
import { Alert } from '@ui/alerts'
import { ConfigKeys } from './config'
import Latex from 'react-latex'
import { useRouter } from 'next/router'
import {
  getRandomStrainSet,
  getRandomTemperatureSet,
  getRandomDisplacementSet,
  getRandomCurrentSet,
  getRandomMagneticField,
  getStrainValidationData,
  getRandomAmplitudeSet,
  getRandomFrequencySet,
  getRtdResistanceValidation,
  getThermocoupleVoltageValidation,
  getTauValidationData,
  getLvdtVoltageValidation,
  getResistanceChangeValidation,
  getHallOutputVoltage,
  getPiezoOutputVoltageValidation
} from '@data/index'

export type DataKeys = Record<string, number[]>

export type TaskItem = {
  prompt: string
  data?: number[]
  validation?: number[]
}

interface InitialCreatorProps {
  fields: TaskItem[]
}

export const initialTaskCreator = ({ fields }: InitialCreatorProps) => {
  const tasks = {}

  fields.map((field, fieldIdx) => {
    return (tasks[`data${fieldIdx}`] = field.data)
  })

  return tasks
}

export const initialValidationCreator = ({ fields }: InitialCreatorProps) => {
  const validation = {}

  fields.map((field, fieldId) => {
    return (validation[`validation${fieldId}`] = field.validation)
  })

  return validation
}

interface DataDisplayProps {
  data: number[]
}

export const DataDisplay = ({ data }: DataDisplayProps) => {
  return (
    <div className='mt-2 flex flex-col space-y-1'>
      <div className='flex w-full flex-row space-x-2 '>
        {data.map((value, idx) => {
          return (
            <div
              className='w-full rounded-md bg-blue-500/20 px-2 py-1 text-center text-sm font-medium text-blue-500 dark:bg-blue-400/10 dark:text-blue-400'
              key={idx}
            >
              {value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface TaskPromptFieldProps {
  prompt: string
  initial: number[]
  index: number
  useStore: any
}

export const TaskPromptField = ({
  prompt,
  initial,
  useStore,
  index
}: TaskPromptFieldProps) => {
  const [_, setTask] = useStore((store: ConfigKeys) => store[`data${index}`])

  useEffect(() => {
    setTask({ [`data${index}`]: initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className='flex flex-col'>
      <div className='mb-1 border-b pb-1 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300'>
        Task {index + 1}
      </div>
      <div className='text-justify text-sm'>
        <Latex>{prompt}</Latex>
      </div>
      {initial && <DataDisplay data={initial} />}
    </span>
  )
}

interface TaskFormFieldProps {
  data: number[]
  withValidation?: boolean
  index: number
  useStore: any
  progress: number
  updateProgressHandler: (progress: number) => void
}

export const TaskFormField = ({
  data,
  withValidation,
  index,
  useStore,
  progress,
  updateProgressHandler
}: TaskFormFieldProps) => {
  const [_, setStore] = useStore(
    (store: ConfigKeys) => store[`validation${index}`]
  )
  const formDone = progress === data.length

  useEffect(() => {
    if (!formDone) {
      console.log(
        `Task ${index + 1} (${progress + 1}/${data.length}):`,
        data[progress]
      )
    }
  }, [formDone, index, progress, data])

  const errMsgs = {
    missing: "This can't be empty.",
    invalid: "This doesn't seem to be correct."
  }

  let validator: any
  if (withValidation) {
    validator = object({
      value: number({
        required_error: errMsgs.missing,
        invalid_type_error: errMsgs.missing
      })
        .max(data[progress], { message: errMsgs.invalid })
        .min(data[progress], { message: errMsgs.invalid })
    })
  } else {
    validator = object({
      value: number({
        required_error: errMsgs.missing,
        invalid_type_error: errMsgs.missing
      })
    })
  }

  const form = useZodForm({
    schema: validator,
    reValidateMode: 'onSubmit'
  })

  return (
    <Form
      form={form}
      onSubmit={({ value }) => {
        if (progress !== data.length) {
          if (!withValidation) {
            setStore({ [`validation${index}`]: value })
          }
          updateProgressHandler(progress)
          form.reset()
          setTimeout(() => form.setFocus('value'), 0)
        }
      }}
    >
      <Form.Input
        label={`Your answers for task ${index + 1}`}
        type='number'
        withProgress={{ max: data.length, value: progress }}
        {...form.register('value', { valueAsNumber: true })}
        disabled={formDone}
        step={0.01}
      />
      <Button.Submit disabled={formDone}>
        {formDone ? 'Completed' : 'Submit'}
      </Button.Submit>
    </Form>
  )
}

interface TasksProps {
  initialTasks: DataKeys
  initialValidation: DataKeys
  fields: TaskItem[]
  useStore: any
  unlocked?: boolean
  completionHandler: React.Dispatch<React.SetStateAction<boolean>>
}

export const Tasks = ({
  initialTasks,
  initialValidation,
  fields,
  useStore,
  unlocked,
  completionHandler
}: TasksProps) => {
  const [store, setStore] = useStore((store: ConfigKeys) => store)
  const { asPath } = useRouter()

  const [dataReady, setDataReady] = useState(false)

  const [progress, setProgress] = useState<number[]>([])
  const updateProgress = (idx: number) => {
    const updatedProgress = progress.map((state, index) => {
      return idx === index ? state + 1 : state
    })

    setProgress(updatedProgress)

    let completed = true
    updatedProgress.forEach((value, index) => {
      if (value !== validation[index].length) {
        completed = false
      }
    })

    if (completed) {
      completionHandler(true)
    }
  }

  const [data, setData] = useState<number[][]>([])
  const updateData = ({ data, idx }: { data: number[]; idx: number }) => {
    setData(currentData => {
      currentData[idx] = data
      return currentData
    })
  }

  const [validation, setValidation] = useState<number[][]>([])
  const updateValidation = ({ data, idx }: { data: number[]; idx: number }) => {
    setValidation(currentValidation => {
      currentValidation[idx] = data
      return currentValidation
    })
  }

  /* Scuffed, but does the job */
  if (unlocked && !dataReady) {
    let data0: number[]
    let data1: number[]

    switch (asPath.replace('/laboratories/', '')) {
      case 'temperature/rtd':
        setData([[], []])
        setValidation([[], []])
        setProgress([0, 0])

        data0 = getRandomTemperatureSet({
          min: 0,
          max: 500
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateValidation({
          data: getRtdResistanceValidation({
            coeff: Number(store.sensor.tempCoeff),
            resistance: Number(store.resistance.resistance),
            taskData: data0
          }),
          idx: 0
        })

        updateValidation({
          data: getTauValidationData({
            sensor: {
              type: 'rtd',
              density: Number(store.sensor.density),
              heatCapacity: Number(store.sensor.heatCapacity),
              conductivity: Number(store.sensor.conductivity)
            },
            filler: {
              density: Number(store.filler.density),
              heatCapacity: Number(store.filler.heatCapacity),
              conductivity: Number(store.filler.conductivity)
            },
            thickness: Number(store.thickness.thickness)
          }),
          idx: 1
        })
        break

      case 'temperature/thermocouple':
        setData([[], []])
        setValidation([[], []])
        setProgress([0, 0])

        data0 = getRandomTemperatureSet({
          min: 0,
          max: 500
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateValidation({
          data: getThermocoupleVoltageValidation({
            coeff: Number(store.sensor.seebeckCoeff),
            temperature: Number(store.refTemperature.refTemperature),
            taskData: data0
          }),
          idx: 0
        })

        updateValidation({
          data: getTauValidationData({
            sensor: {
              type: 'thermocouple',
              density: Number(store.sensor.density),
              heatCapacity: Number(store.sensor.heatCapacity),
              conductivity: Number(store.sensor.conductivity)
            },
            filler: {
              density: Number(store.filler.density),
              heatCapacity: Number(store.filler.heatCapacity),
              conductivity: Number(store.filler.conductivity)
            },
            thickness: Number(store.thickness.thickness)
          }),
          idx: 1
        })
        break

      case 'displacement/lvdt':
        setData([[]])
        setValidation([[]])
        setProgress([0])

        data0 = getRandomDisplacementSet({
          min: 0,
          max: 15
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateValidation({
          data: getLvdtVoltageValidation({
            turns: Number(store.turns.turns),
            voltage: Number(store.voltage.voltage),
            frequency: Number(store.frequency.frequency),
            taskData: data0
          }),
          idx: 0
        })
        break

      case 'strain/strain-gauge':
        setData([[], []])
        setValidation([[], []])
        setProgress([0, 0])

        data0 = getRandomStrainSet({
          modulus: Number(store.material.modulus)
        })

        data1 = getRandomTemperatureSet({
          min: 0,
          max: 50
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateData({
          data: data1,
          idx: 1
        })

        updateValidation({
          data: getStrainValidationData({
            material: store.material,
            voltage: Number(store.voltage.voltage),
            resistance: Number(store.resistance.resistance),
            bridge: store.bridge,
            taskData: data0
          }),
          idx: 0
        })

        updateValidation({
          data: getStrainValidationData({
            material: store.material,
            voltage: Number(store.voltage.voltage),
            resistance: Number(store.resistance.resistance),
            bridge: store.bridge,
            taskData: data1,
            withTemperature: true
          }),
          idx: 1
        })
        break

      case 'magnetoresistance/amr':
        setData([[]])
        setValidation([[]])
        setProgress([0])

        data0 = getRandomCurrentSet({
          min: -1,
          max: 1
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateValidation({
          data: getResistanceChangeValidation({
            hyValue: Number(store.hyValue.hyValue),
            taskData: data0
          }),
          idx: 0
        })
        break

      case 'magnetoresistance/hall-effect':
        setData([[]])
        setValidation([[]])
        setProgress([0])

        data0 = getRandomMagneticField({
          min: -50,
          max: 50
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateValidation({
          data: getHallOutputVoltage({
            hallCoefficient: Number(store.material.hallCoeff),
            thickness: Number(store.thickness.thickness),
            current: Number(store.current.current),
            taskData: data0
          }),
          idx: 0
        })

        break
      case 'piezoelectricity/cable':
        break
      case 'piezoelectricity/accelerometer':
        setData([[], []])
        setValidation([[], []])
        setProgress([0, 0])

        data0 = getRandomAmplitudeSet({
          min: 0.1,
          max: 1.1
        })

        data1 = getRandomFrequencySet({
          min: 6,
          max: 34
        })

        updateData({
          data: data0,
          idx: 0
        })

        updateData({
          data: data1,
          idx: 1
        })

        updateValidation({
          data: getPiezoOutputVoltageValidation({
            constant: 'frequency',
            piezoCoefficient: Number(store.material.piezoCoeff),
            frequency: Number(store.frequency.frequency),
            amplitude: Number(store.amplitude.amplitude),
            taskData: data0
          }),
          idx: 0
        })

        updateValidation({
          data: getPiezoOutputVoltageValidation({
            constant: 'amplitude',
            piezoCoefficient: Number(store.material.piezoCoeff),
            frequency: Number(store.frequency.frequency),
            amplitude: Number(store.amplitude.amplitude),
            taskData: data1
          }),
          idx: 1
        })

        break
      case 'transducers/measurement-loop':
        break
      case 'transducers/pressure':
        break
      default:
        throw new Error('Laboratory not found')
    }

    setDataReady(true)
  }

  useEffect(() => {
    if (unlocked) {
      Object.keys(initialValidation).map((_, index) => {
        setStore({ [`validation${index}`]: validation[index] })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked])

  return (
    <div className='flex w-full max-w-sm flex-col gap-2 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Tasks for the laboratory</span>
      {unlocked ? (
        <div className='flex h-full flex-col space-y-4'>
          {Object.keys(initialTasks).map((_, index) => {
            return (
              <TaskPromptField
                prompt={fields[index].prompt}
                initial={data[index]}
                useStore={useStore}
                key={index}
                index={index}
              />
            )
          })}
          {Object.keys(initialValidation).map((_, index) => {
            return (
              <TaskFormField
                key={index}
                data={validation[index]}
                withValidation={true}
                index={index}
                useStore={useStore}
                progress={progress[index]}
                updateProgressHandler={() => updateProgress(index)}
              />
            )
          })}
        </div>
      ) : (
        <Alert status='warning' title='Configuration not saved'>
          You need to save the configuration in order to continue.
        </Alert>
      )}
    </div>
  )
}
