import type { AnyObject } from 'fx-flow'
import type { NestedProperty } from './type'

export const nestedGetter = <Data extends AnyObject, Key extends string>(
  data: AnyObject,
  key: Key
): NestedProperty<Data, Key> => {
  if (key === '') {
    return data as any
  }

  let target: any = data
  key.split('.').forEach((x) => {
    if (target instanceof Object && x in target) {
      target = target[x]
    } else {
      return
    }
  })
  return target
}

export const useFormData = <Data extends AnyObject>(
  initialData: Data
): {
  getFormData: <Key extends string>(setter?: [key: Key, (value: NestedProperty<Data, Key>) => void]) => Data
  setFormData: <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => void
  overrideFormData: (formData: Data) => void
  onFormDataFieldChange: <Key extends string>(
    key: Key,
    handler: (value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => void
  onFormDataChange: (handler: (formData: Data) => void) => void
} => {
  const setters = new Map<string, (value: any) => void>()
  const onFieldChangeHandlers = new Map<string, (value: unknown, prevValue: unknown) => void>()
  const onChangeHandlers = new Set<(formData: Data) => void>()
  let formData: Data = initialData

  const getFormData = <Key extends string>(setter?: [key: Key, (value: NestedProperty<Data, Key>) => void]) => {
    if (setter) {
      setters.set(setter[0], setter[1])
    }
    return formData
  }

  const setFormData = <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => {
    const keys = key.split('.')
    if (keys.length === 0) {
      return
    }

    const target = nestedGetter(formData, keys.slice(0, -1).join('.'))
    if (!target) {
      return
    }

    const lastKey = keys[keys.length - 1]
    if (target instanceof Object) {
      const prevValue = target[lastKey]
      target[lastKey] = value

      const setter = setters.get(key)
      if (setter) {
        setter(nestedGetter(formData, key))
      }

      const handler = onFieldChangeHandlers.get(key)
      if (handler) {
        handler(value, prevValue)
      }

      onChangeHandlers.forEach((handler) => {
        handler(formData)
      })
    }
  }

  const overrideFormData = (data: Data) => {
    const prevFormData = formData
    formData = data

    setters.forEach((setter, key) => {
      setter(nestedGetter(formData, key))
    })

    onFieldChangeHandlers.forEach((handler, key) => {
      handler(nestedGetter(formData, key), nestedGetter(prevFormData, key))
    })

    onChangeHandlers.forEach((handler) => {
      handler(formData)
    })
  }

  const onFormDataFieldChange = <Key extends string>(
    key: Key,
    handler: (value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => {
    onFieldChangeHandlers.set(key, handler as any)
  }

  const onFormDataChange = (handler: (formData: Data) => void) => {
    onChangeHandlers.add(handler)
  }

  return {
    getFormData,
    setFormData,
    overrideFormData,
    onFormDataFieldChange,
    onFormDataChange
  }
}
