function useCachedFn<A, R>(
  fn: (args: A) => Promise<R>
): (args: A, force?: boolean) => Promise<R>
function useCachedFn<R>(fn: () => Promise<R>): (force?: boolean) => Promise<R>

function useCachedFn<A, R>(
  fn: (args?: A) => Promise<R>
):
  | ((args: A, force?: boolean) => Promise<R>)
  | ((force?: boolean) => Promise<R>) {
  let cache: Promise<R> | undefined

  let cachedFn: any
  if (fn.length === 0) {
    cachedFn = (force?: boolean) => {
      if (force || !cache) {
        try {
          cache = fn()
        } catch (e) {
          return Promise.reject(e)
        }
      }

      return cache
    }
  } else {
    cachedFn = (args: A, force?: boolean) => {
      if (force || !cache) {
        try {
          cache = fn(args)
        } catch (e) {
          return Promise.reject(e)
        }
      }

      return cache
    }
  }

  return cachedFn
}

export { useCachedFn }
