import { useEffect } from 'react'
import { TaskItem } from '@utils/tasks'
import { Form, useZodForm } from '@ui/forms'
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
      <div className='text-sm text-gray-700 dark:text-gray-300'>
        Your datapoints:
      </div>
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

interface TaskFieldProps {
  prompt: string
  initial: number[]
  index: number
  useStore: any
}

const TaskField = ({ prompt, initial, useStore, index }: TaskFieldProps) => {
  const [dataValue, setTask] = useStore(
    (store: ConfigKeys) => store[`data${index}`]
  )

  useEffect(() => {
    setTask({ [`data${index}`]: initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className='flex flex-col'>
      <div className='text-sm'>
        <Latex>{prompt}</Latex>
      </div>
      {initial && <DataDisplay data={initial} />}
    </span>
  )
}

interface TasksFormProps {}

export const TaskForm = ({}: TasksFormProps) => {
  return <div></div>
}

interface TasksProps {
  initialTasks: DataKeys
  initialValidation: DataKeys
  fields: TaskItem[]
  useStore: any
  unlocked?: boolean
}

export const Tasks = ({
  initialTasks,
  initialValidation,
  fields,
  useStore,
  unlocked
}: TasksProps) => {
  const [store, setStore] = useStore((store: ConfigKeys) => store)
  const { asPath } = useRouter()

  /* Scuffed, but does the job */
  const data: number[][] = []
  const validation: number[][] = []

  switch (asPath.replace('/laboratories/', '')) {
    case 'temperature/rtd':
      break
    case 'temperature/thermocouple':
      break
    case 'displacement/lvdt':
      break
    case 'strain/strain-gauge':
      data[0] = getRandomStrainSet({
        modulus: Number(store.material.modulus)
      })
      data[1] = getRandomTemperatureSet({
        min: 5,
        max: 45
      })
      validation[0] = getStrainValidationData({
        material: store.material,
        voltage: Number(store.voltage.voltage),
        resistance: Number(store.resistance.resistance),
        bridge: store.bridge,
        taskData: data[0]
      })
      validation[1] = getStrainValidationData({
        material: store.material,
        voltage: Number(store.voltage.voltage),
        resistance: Number(store.resistance.resistance),
        bridge: store.bridge,
        taskData: data[0],
        withTemperature: true
      })
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

  useEffect(() => {
    if (unlocked) {
      Object.keys(initialValidation).map((_, index) => {
        setStore({ [`validation${index}`]: validation[index] })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked])

  return (
    <div className='flex h-full max-h-fit w-full max-w-sm flex-col gap-2 rounded-md bg-gray-200/30 p-4 dark:bg-gray-800'>
      <span className='font-medium'>Tasks for the laboratory</span>
      {unlocked ? (
        <div className='flex flex-col space-y-4'>
          {Object.keys(initialTasks).map((_, index) => {
            return (
              <TaskField
                prompt={fields[index].prompt}
                initial={data[index]}
                useStore={useStore}
                key={index}
                index={index}
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
