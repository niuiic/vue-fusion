export const log =
  (fn: (type: 'INPUT' | 'OUTPUT' | 'ERROR', msg: unknown, instance: unknown) => void = console.trace) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value

    if (typeof method !== 'function') {
      throw new Error('Log decorator can only be applied to methods')
    }

    descriptor.value = function (...args: any[]) {
      fn('INPUT', args, this)

      let result: unknown
      try {
        result = method.apply(this, args)
      } catch (e) {
        fn('ERROR', e, this)
        throw e
      }

      if (result instanceof Promise) {
        return result.then(
          (x) => {
            fn('OUTPUT', x, this)
            return x
          },
          (e) => {
            fn('ERROR', e, this)
            throw e
          }
        )
      }

      fn('OUTPUT', result, this)
      return result
    }
  }
