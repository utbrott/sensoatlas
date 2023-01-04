import { configFields } from '@data/laboratories/strain/strain-gauge'
import { Config } from '@atoms/config'
import { configContextCreator } from '@utils/initial-config-creator'
import createConfigContext from '@utils/create-config-context'

const initial = configContextCreator({ fields: configFields })

export const { Provider, useStore } = createConfigContext(initial)
