export type Enum<T extends string | symbol | number, R> = {
  [K in T | '_']: R
}

export function useEnum<A extends string | symbol | number, R>(args: Enum<A, R>) {
  function map(key: A): R
  function map(value: R, reverse: true): A
  function map(search: A | R, reverse?: true): any {
    if (reverse) {
      for (const [key, value] of Object.entries(args)) {
        if (value === search) {
          return key
        }
      }
      return '_'
    }
    if (Reflect.has(args, search as A)) {
      return Reflect.get(args, search as A)
    }
    return args['_']
  }

  return map
}
