import { configFields } from '@data/laboratories/strain/strain-gauge'
import { Config } from '@atoms/config'
import { configContextCreator } from '@utils/initial-config-creator'
import createConfigContext from '@utils/create-config-context'

export const config = configContextCreator({ fields: configFields })

export const { Provider, useStore } = createConfigContext(config)
