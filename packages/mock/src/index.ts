import type { Result } from 'result'

let modules: Record<string, () => Promise<object>> = {}

export const useMock = async (module: string, fn: string) => {
  const targetModule = Reflect.get(modules, module)

  if (!targetModule) {
    throw new ReferenceError(`cannot found module ${module}`)
  }

  return targetModule().then(
    (x) => {
      const targetFn = Reflect.get(x, fn)

      if (!targetFn) {
        throw new ReferenceError(`cannot found function ${fn} in module ${module}`)
      }

      if (typeof targetFn !== 'function') {
        throw new TypeError(`${fn} is not a function`)
      }

      return targetFn
    },
    () => {
      throw new ReferenceError(`cannot import module ${module}`)
    }
  )
}

export const mock =
  <A, R>(fn: (args: A) => Promise<Result<R>>) =>
  (args: A) =>
    fn(args)

export const registerMock = (args: Record<string, () => Promise<object>>) => (modules = args)
