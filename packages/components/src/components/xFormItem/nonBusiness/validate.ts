import type { AnyObject, MaybePromise } from 'fx-flow'
import { nestedGet } from './useFormData'

export const formDataValid = async <Data extends AnyObject>(
  formData: Data,
  configList: {
    dataKey: string
    rules?: ((value: any, formData: AnyObject) => MaybePromise<string | undefined>)[]
  }[]
): Promise<boolean> => {
  let invalid = false

  for (const config of configList) {
    if (!config.rules) {
      continue
    }

    for (const rule of config.rules) {
      const fn = async () => rule(nestedGet(formData, config.dataKey), formData)
      await fn()
        .catch(() => 'panic')
        .then((x) => (invalid = x !== undefined))
      if (invalid) {
        return false
      }
    }
  }

  return true
}
