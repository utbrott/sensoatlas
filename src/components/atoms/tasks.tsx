import { useEffect, useState } from 'react'
import { TaskItem } from '@utils/tasks'
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
  getStrainValidationData
} from '@data/index'

export type DataKeys = Record<string, number[]>

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
      <div className='text-sm'>
        <Latex>{prompt}</Latex>
      </div>
      {initial && <DataDisplay data={initial} />}
    </span>
  )
}

interface TaskFormFieldProps {
  validation: number[]
  index: number
  progress: number
  updateProgressHandler: (progress: number) => void
}

export const TaskFormField = ({
  validation,
  index,
  progress,
  updateProgressHandler
}: TaskFormFieldProps) => {
  const currentValidation = validation[progress]
  const formDone = progress === validation.length

  useEffect(() => {
    if (!formDone) {
      console.log(
        `Task ${index + 1} (${progress + 1}/${validation.length}):`,
        currentValidation
      )
    }
  }, [currentValidation, index, progress, validation, formDone])

  const validator = object({
    value: number({
      required_error: "This can't be empty",
      invalid_type_error: "This can't be empty"
    })
      .max(currentValidation, { message: "This doesn't seem to be correct." })
      .min(currentValidation, { message: "This doesn't seem to be correct." })
  })

  const form = useZodForm({
    schema: validator,
    reValidateMode: 'onSubmit'
  })

  return (
    <Form
      form={form}
      onSubmit={({ value }) => {
        console.log('valid', value)
        if (progress !== validation.length) {
          updateProgressHandler(progress)
          form.setValue('value', null)
        }
      }}
    >
      <Form.Input
        label={`Your answers for task ${index + 1}`}
        type='number'
        withProgress={{ max: validation.length, value: progress }}
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
  const [data, setData] = useState<number[][]>([[], []])
  const [validation, setValidation] = useState<number[][]>([[], []])
  const [progress, setProgress] = useState([0, 0])

  useEffect(() => {
    if (unlocked) {
      Object.keys(initialValidation).map((_, index) => {
        setStore({ [`validation${index}`]: validation[index] })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked])

  const updateProgress = (idx: number) => {
    const updatedProgress = progress.map((state, index) => {
      return idx === index ? state + 1 : state
    })

    setProgress(updatedProgress)
  }

  const updateData = (newData: number[], idx: number) => {
    setData(currentData => {
      currentData[idx] = newData
      return currentData
    })
  }

  const updateValidation = (newValidation: number[], idx: number) => {
    setValidation(currentValidation => {
      currentValidation[idx] = newValidation
      return currentValidation
    })
  }

  /* Scuffed, but does the job */
  if (unlocked && !dataReady) {
    switch (asPath.replace('/laboratories/', '')) {
      case 'temperature/rtd':
        break
      case 'temperature/thermocouple':
        break
      case 'displacement/lvdt':
        break
      case 'strain/strain-gauge':
        const data0 = getRandomStrainSet({
          modulus: Number(store.material.modulus)
        })
        updateData(data0, 0)
        console.log(data)
        const data1 = getRandomTemperatureSet({
          min: 5,
          max: 45
        })
        updateData(data1, 1)
        console.log(data)

        const validation0 = getStrainValidationData({
          material: store.material,
          voltage: Number(store.voltage.voltage),
          resistance: Number(store.resistance.resistance),
          bridge: store.bridge,
          taskData: data0
        })
        updateValidation(validation0, 0)
        const validation1 = getStrainValidationData({
          material: store.material,
          voltage: Number(store.voltage.voltage),
          resistance: Number(store.resistance.resistance),
          bridge: store.bridge,
          taskData: data1,
          withTemperature: true
        })
        updateValidation(validation1, 1)

        if (dataReady) {
          if (
            progress[0] === validation[0].length &&
            progress[1] === validation[1].length
          ) {
            console.log('complete')
            completionHandler(true)
          }
        }

        break
      case 'magnetoresistance/amr':
        break
      case 'magnetoresistance/hall-effect':
        break
      case 'piezoelectricity/cable':
        break
      case 'piezoelectricity/accelerometer':
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

  return (
    <div className='flex w-full max-w-sm flex-col gap-2 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Tasks for the laboratory</span>
      {unlocked ? (
        <div className='flex h-full flex-col justify-between space-y-4'>
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
                validation={validation[index]}
                index={index}
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
