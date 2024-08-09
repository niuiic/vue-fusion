export type Enum<K extends string | symbol | number, V> = Record<K, V>

export function useEnum<K extends string | symbol | number, V>(map: Enum<K, V>, defaultKey: K, defaultValue: V) {
  const toValue = (key: K): V => {
    if (Reflect.has(map, key)) {
      return map[key]
    }
    return defaultValue
  }

  const toKey = (value: V) => {
    for (const key in map) {
      if (map[key] === value) {
        return key
      }
    }
    return defaultKey
  }

  const match = (value: K, keys?: K[]): boolean => {
    const fixedKeys = keys ?? (Object.keys(map) as K[])
    return fixedKeys.includes(value)
  }

  return { toValue, toKey, map, match }
}
