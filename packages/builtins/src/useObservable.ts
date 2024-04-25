import type { AnyObject } from 'fx-flow'

export type NestedProperty<T, K extends string> = K extends ''
  ? T
  : K extends `${infer First}.${infer Rest}`
    ? T extends Record<string, any>
      ? First extends keyof T
        ? NestedProperty<T[First], Rest>
        : never
      : never
    : T extends Record<string, any>
      ? K extends keyof T
        ? T[K]
        : never
      : never

export const nestedGet = <Data extends AnyObject, Key extends string>(
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

export const useObservable = <Data extends AnyObject>(
  initialData: Data
): {
  getData: <Key extends string>(setter?: [Key, (value: NestedProperty<Data, Key>) => void]) => Data
  setData: <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => void
  overrideData: (data: Data) => void
  onDataFieldChange: <Key extends string>(
    key: Key,
    handler: (value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => void
  onDataChange: (handler: (data: Data) => void) => void
} => {
  const setters = new Map<string, (value: any) => void>()
  const onFieldChangeHandlers = new Map<string, (value: unknown, prevValue: unknown) => void>()
  const onChangeHandlers = new Set<(data: Data) => void>()
  let observable: Data = initialData

  const getData = <Key extends string>(setter?: [key: Key, (value: NestedProperty<Data, Key>) => void]) => {
    if (setter) {
      setters.set(setter[0], setter[1])
    }
    return observable
  }

  const setData = <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => {
    const keys = key.split('.')
    if (keys.length === 0) {
      return
    }

    const target = nestedGet(observable, keys.slice(0, -1).join('.'))
    if (!target) {
      return
    }

    const lastKey = keys[keys.length - 1]
    if (target instanceof Object) {
      const prevValue = target[lastKey]
      target[lastKey] = value

      const setter = setters.get(key)
      if (setter) {
        setter(nestedGet(observable, key))
      }

      const handler = onFieldChangeHandlers.get(key)
      if (handler) {
        handler(value, prevValue)
      }

      onChangeHandlers.forEach((handler) => {
        handler(observable)
      })
    }
  }

  const overrideData = (data: Data) => {
    const prevObservable = observable
    observable = data

    setters.forEach((setter, key) => {
      setter(nestedGet(observable, key))
    })

    onFieldChangeHandlers.forEach((handler, key) => {
      handler(nestedGet(observable, key), nestedGet(prevObservable, key))
    })

    onChangeHandlers.forEach((handler) => {
      handler(observable)
    })
  }

  const onDataFieldChange = <Key extends string>(
    key: Key,
    handler: (value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => {
    onFieldChangeHandlers.set(key, handler as any)
  }

  const onDataChange = (handler: (data: Data) => void) => {
    onChangeHandlers.add(handler)
  }

  return {
    getData,
    setData,
    overrideData,
    onDataFieldChange,
    onDataChange
  }
}
