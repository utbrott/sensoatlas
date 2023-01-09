export type ConfigItem = {
  type: 'select' | 'radio'
  id: string
  label?: string
  options?: { [key: string]: number | string }[]
}

interface Props {
  fields: ConfigItem[]
}

export const initialConfigCreator = ({ fields }: Props) => {
  const config = {}

  fields.map(field => {
    const option = field.options.find(opt => opt.name === field.options[0].name)
    return (config[field.id] = option)
  })

  return config
}

export const getFieldById = (fields: ConfigItem[], fieldId: string) => {
  return fields.find((field: ConfigItem) => field.id == fieldId)
}

export const getFieldOption = (field: ConfigItem, optionName: string) => {
  return field.options.find(option => option.name === optionName)
}
