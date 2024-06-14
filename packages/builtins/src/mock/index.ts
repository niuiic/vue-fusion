import type { Result } from 'fx-flow'

let modules: Record<string, () => Promise<object>> = {}
let prefix: string | undefined

export const useMock =
  (module: string, fn: string) =>
  (...args: any[]) => {
    const moduleName = prefix ? `${prefix}${module}` : module

    const targetModule = modules[moduleName + '.ts'] ?? modules[moduleName + '/index.ts']

    if (!targetModule) {
      throw new ReferenceError(`useMock: failed to found module ${moduleName}`)
    }

    return targetModule().then(
      (x) => {
        const targetFn = Reflect.get(x, fn)

        if (!targetFn) {
          throw new ReferenceError(`useMock: failed to found function ${fn} in module ${moduleName}`)
        }

        if (typeof targetFn !== 'function') {
          throw new TypeError(`useMock: ${fn} is not a function`)
        }

        return targetFn(...args)
      },
      (e) => {
        throw new ReferenceError(`useMock: failed to import module ${moduleName}`, {
          cause: e
        })
      }
    )
  }

export const mock = <A, R>(fn: (args: A) => Promise<Result<R>>) => fn

export const registerMock = (mods: Record<string, () => Promise<object>>, modPrefix?: string) => {
  modules = mods
  prefix = modPrefix
}
