export type TaskItem = {
  prompt: string
  data?: number[]
}

interface Props {
  fields: TaskItem[]
}

export const initialTaskCreator = ({ fields }: Props) => {
  const tasks = {}

  fields.map((field, fieldIdx) => {
    return (tasks[`task${fieldIdx}`] = field.data)
  })

  return tasks
}

export const getTaskById = () => {}
