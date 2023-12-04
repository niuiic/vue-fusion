import type { Result } from 'result'

let modules: Record<string, () => Promise<object>> = {}
let prefix: string | undefined

export const useMock =
  (module: string, fn: string) =>
  (...args: any[]) => {
    const moduleName = prefix ? `${prefix}${module}` : module

    const targetModule = Reflect.get(modules, moduleName + '.ts') ?? Reflect.get(modules, moduleName + '/index.ts')

    if (!targetModule) {
      throw new ReferenceError(`cannot found module ${moduleName}`)
    }

    return targetModule().then(
      (x) => {
        const targetFn = Reflect.get(x, fn)

        if (!targetFn) {
          throw new ReferenceError(`cannot found function ${fn} in module ${moduleName}`)
        }

        if (typeof targetFn !== 'function') {
          throw new TypeError(`${fn} is not a function`)
        }

        return targetFn(...args)
      },
      () => {
        throw new ReferenceError(`cannot import module ${moduleName}`)
      }
    )
  }

export const mock =
  <A, R>(fn: (args: A) => Promise<Result<R>>) =>
  (args: A) =>
    fn(args)

export const registerMock = (mods: Record<string, () => Promise<object>>, modPrefix?: string) => {
  modules = mods
  prefix = modPrefix
}
