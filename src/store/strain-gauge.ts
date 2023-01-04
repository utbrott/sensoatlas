import { configFields } from '@data/laboratories/strain/strain-gauge'
import { Config } from '@atoms/config'
import { initialConfigCreator } from '@utils/initial-config-creator'
import createConfigContext from '@utils/create-config-context'

export const config = initialConfigCreator({ fields: configFields })
console.log(config)

export const { Provider, useStore } = createConfigContext(config)
