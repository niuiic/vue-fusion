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
): [
  get: <Key extends string>(setter?: [key: Key, (value: NestedProperty<Data, Key>) => void]) => Data,
  set: <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => void,
  onChange: <Key extends string>(
    handler: (key: Key, value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => void
] => {
  const setters = new Set<[key: string, (value: unknown) => void]>()
  const handlers = new Set<(key: string, value: unknown, prevValue: unknown) => void>()
  const formData: Data = initialData

  const get = <Key extends string>(setter?: [key: Key, (value: NestedProperty<Data, Key>) => void]) => {
    if (setter) {
      setters.add(setter as any)
    }
    return formData
  }

  const set = <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => {
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
      setters.forEach(([key, setter]) => {
        setter(nestedGetter(formData, key))
      })
      handlers.forEach((handler) => {
        handler(key, value, prevValue)
      })
    }
  }

  const onChange = <Key extends string>(
    handler: (key: Key, value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => {
    handlers.add(handler as any)
  }

  return [get, set, onChange]
}
