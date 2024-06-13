import { toStr, type AnyObject } from 'fx-flow'
import { inMode } from './mode'

// # nestedGet
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

/** 若搜索不到key的上一级则抛出错误 */
export const nestedGet = <Data extends AnyObject, Key extends string>(
  data: AnyObject,
  key: Key
): NestedProperty<Data, Key> => {
  if (key === '') {
    return data as any
  }

  let target: any = data
  const keys = key.split('.')
  for (const k of keys) {
    try {
      target = target[k]
    } catch (e) {
      throw new ReferenceError(`nestedGet: ${toStr(e)}`)
    }
  }
  return target
}

// # useObservable
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
  const onFieldChangeHandlers = new Map<string, Set<(value: any, prevValue: any) => void>>()
  const onChangeHandlers = new Set<(data: Data) => void>()
  let observable: Data = initialData

  // ## getData
  const getData = () => observable

  // ## setData
  const setData = <Key extends string>(key: Key, value: NestedProperty<Data, Key>) => {
    const keys = key.split('.')
    if (keys.length === 0) {
      if (inMode('DEV')) {
        throw new Error('useObservable: key passed to setData should not be an empty string')
      } else {
        return
      }
    }

    let target
    try {
      target = nestedGet(observable, keys.slice(0, -1).join('.'))
    } catch (e) {
      if (inMode('DEV')) {
        throw e
      } else {
        return
      }
    }
    if (!target) {
      if (inMode('DEV')) {
        throw new Error(`useObservable: unable to find parent key of ${key} when setData`)
      } else {
        return
      }
    }
    if (!(target instanceof Object)) {
      if (inMode('DEV')) {
        throw new Error(`useObservable: unable to set value for ${key} when setData`)
      } else {
        return
      }
    }

    const lastKey = keys[keys.length - 1]
    const prevValue = target[lastKey]
    target[lastKey] = value

    onFieldChangeHandlers.get(key)?.forEach((handler) => handler(value, prevValue))

    onChangeHandlers.forEach((handler) => {
      handler(observable)
    })
  }

  // ## overrideData
  const overrideData = (data: Data) => {
    const prevObservable = observable
    observable = data

    onFieldChangeHandlers.forEach((set, key) => {
      let value
      try {
        value = nestedGet(observable, key)
      } catch (e) {
        if (inMode('DEV')) {
          throw e
        } else {
          return
        }
      }
      let prevValue
      try {
        prevValue = nestedGet(prevObservable, key)
      } catch (e) {
        if (inMode('DEV')) {
          throw e
        } else {
          return
        }
      }
      set.forEach((handler) => handler(value, prevValue))
    })

    onChangeHandlers.forEach((handler) => {
      handler(observable)
    })
  }

  // ## onDataFieldChange
  const onDataFieldChange = <Key extends string>(
    key: Key,
    handler: (value: NestedProperty<Data, Key>, prevValue: NestedProperty<Data, Key>) => void
  ) => {
    if (!onFieldChangeHandlers.has(key)) {
      onFieldChangeHandlers.set(key, new Set())
    }
    onFieldChangeHandlers.get(key)?.add(handler)
  }

  // ## onDataChange
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
