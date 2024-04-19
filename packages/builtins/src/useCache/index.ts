interface Options<T> {
  cacheValid: (newArgs: T, oldArgs: T, cacheTime: number) => boolean
}

export const useCacheFn = <A, R>(
  fn: (args: A) => Promise<R>,
  options?: Partial<Options<A>>
): [cacheFn: (args: A) => Promise<R>, cleanCache: () => void] => {
  const cacheValid = (_newArgs: A, _oldArgs: A, _cacheTime: number) => {
    return true
  }
  const fixedOptions: Options<A> = {
    cacheValid: options?.cacheValid ?? cacheValid
  }

  let oldArgs: A | undefined
  let cacheTime: number | undefined
  let cache: Promise<R> | undefined

  const cacheFn = (args: A) => {
    if (!cache || !fixedOptions.cacheValid(args, oldArgs!, cacheTime!)) {
      try {
        oldArgs = args
        cacheTime = new Date().getTime()
        cache = fn(args)
      } catch (e) {
        return Promise.reject(e)
      }
    }

    return cache
  }

  const cleanCache = () => {
    oldArgs = undefined
    cache = undefined
    cacheTime = undefined
  }

  return [cacheFn, cleanCache]
}
