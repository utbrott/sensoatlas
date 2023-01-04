import { ConfigItem } from './initial-config-creator'

export const getFieldById = (fields: ConfigItem[], fieldId: string) => {
  return fields.find((field: ConfigItem) => field.id == fieldId)
}

export const getFieldOption = (field: ConfigItem, optionName: string) => {
  return field.options.find(option => option.name === optionName)
}
