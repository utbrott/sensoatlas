import { createStoreContext } from '@store/create-store-context';

import {
  configFields,
  taskFields
} from '@data/laboratories/transducers/pressure';

import { initialConfigCreator } from '@atoms/config';
import { initialTaskCreator, initialValidationCreator } from '@atoms/tasks';

export const config = initialConfigCreator({ fields: configFields });
export const tasks = initialTaskCreator({ fields: taskFields });
export const validation = initialValidationCreator({ fields: taskFields });

const testContext = { ...config, ...tasks, ...validation };

export const { Provider, useStore } = createStoreContext(testContext);
