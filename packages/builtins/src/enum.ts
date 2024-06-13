export type Enum<K extends string | symbol | number, V> = Record<K, V>

class EnumClass<K extends string | symbol | number, V> {
  public constructor(
    public map: Enum<K, V>,
    private defaultKey: K,
    private defaultValue: V
  ) {}

  public toValue(key: K): V {
    if (Reflect.has(this.map, key)) {
      return Reflect.get(this.map, key)
    }
    return this.defaultValue
  }

  public toKey(value: V) {
    for (const key in this.map) {
      if (this.map[key] === value) {
        return key
      }
    }
    return this.defaultKey
  }
}

export function useEnum<A extends string | symbol | number, R>(map: Enum<A, R>, defaultKey: A, defaultValue: R) {
  return new EnumClass(map, defaultKey, defaultValue)
}
