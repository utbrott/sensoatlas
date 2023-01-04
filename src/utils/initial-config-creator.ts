export type ConfigItem = {
  type: 'select' | 'radio'
  id: string
  label?: string
  options?: { [key: string]: number | string }[]
}

interface Props {
  fields: ConfigItem[]
}

export const configContextCreator = ({ fields }: Props) => {
  const config = {}

  fields.map(field => {
    const option = field.options.find(opt => opt.name === field.options[0].name)
    return (config[field.id] = option)
  })

  return config
}
