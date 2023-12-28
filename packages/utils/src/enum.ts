export type Enum<T extends string | symbol | number, R> = {
  [K in T]: R
}

export function useEnum<A extends string | symbol | number, R>(args: Enum<A, R>, defaultValue?: R) {
  function map(key: A): R
  function map(value: R, reverse: true): A
  function map(search: A | R, reverse?: true): any {
    if (reverse) {
      const target = Object.entries(args).find(([_, value]) => value === search)
      if (target) {
        return target[0]
      }
      return
    }
    if (Reflect.has(args, search as A)) {
      return Reflect.get(args, search as A)
    }
    return defaultValue ?? '-'
  }

  return map
}
