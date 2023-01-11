export type TaskItem = {
  prompt: string
  data?: number[]
  validation?: number[]
}

interface Props {
  fields: TaskItem[]
}

export const initialTaskCreator = ({ fields }: Props) => {
  const tasks = {}

  fields.map((field, fieldIdx) => {
    return (tasks[`data${fieldIdx}`] = field.data)
  })

  return tasks
}

export const initialValidationCreator = ({ fields }: Props) => {
  const validation = {}

  fields.map((field, fieldId) => {
    return (validation[`validation${fieldId}`] = field.validation)
  })

  return validation
}

export const getTaskById = () => {}
