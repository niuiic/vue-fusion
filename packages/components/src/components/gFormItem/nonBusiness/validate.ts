import { inMode, nestedGet } from 'builtins'
import { toStr, type AnyObject, type MaybePromise } from 'fx-flow'

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
        .catch((e) => {
          inMode('DEV') && console.error('formDataValid:', toStr(e))
          return '未知错误'
        })
        .then((x) => (invalid = x !== undefined))
      if (invalid) {
        return false
      }
    }
  }

  return true
}
