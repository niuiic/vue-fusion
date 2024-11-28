export const Log =
  (fn: (type: 'INPUT' | 'OUTPUT' | 'ERROR', msg: unknown) => void) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value

    if (typeof method !== 'function') {
      throw new Error('Log decorator can only be applied to methods')
    }

    descriptor.value = function (...args: any[]) {
      fn('INPUT', args)

      let result: unknown
      try {
        result = method.apply(this, args)
      } catch (e) {
        fn('ERROR', e)
        throw e
      }

      if (result instanceof Promise) {
        return result.then(
          (x) => {
            fn('OUTPUT', x)
            return x
          },
          (e) => {
            fn('ERROR', e)
            throw e
          }
        )
      }

      fn('OUTPUT', result)
      return result
    }
  }
