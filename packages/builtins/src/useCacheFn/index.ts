function useCacheFn<A, R>(fn: (args: A) => Promise<R>): (args: A, force?: boolean) => Promise<R>
function useCacheFn<R>(fn: () => Promise<R>): (force?: boolean) => Promise<R>

function useCacheFn<A, R>(
  fn: (args?: A) => Promise<R>
): ((args: A, force?: boolean) => Promise<R>) | ((force?: boolean) => Promise<R>) {
  let cache: Promise<R> | undefined

  let cacheFn: any
  if (fn.length === 0) {
    cacheFn = (force?: boolean) => {
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
    cacheFn = (args: A, force?: boolean) => {
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

  return cacheFn
}

export { useCacheFn }
