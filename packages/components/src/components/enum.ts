export type Enum<K extends string | symbol | number, V> = Record<K, V>

export function useEnum<K extends string | symbol | number, V>(
  map: Enum<K, V>,
  defaultKey: K,
  defaultValue: V
) {
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

  const hasKey = (value: K, keys?: K[]): boolean => {
    const fixedKeys = keys ?? (Object.keys(map) as K[])
    return fixedKeys.includes(value)
  }

  function mapObj(): Enum<K, V>
  function mapObj<Keys extends K[]>(keys: Keys): Enum<Keys[number], V>
  function mapObj<Keys extends K[]>(keys?: Keys) {
    if (!keys) {
      return map
    }

    return Object.fromEntries(keys.map((key) => [key, toValue(key)])) as Enum<
      Keys[number],
      V
    >
  }

  return { toValue, toKey, mapObj, hasKey }
}
