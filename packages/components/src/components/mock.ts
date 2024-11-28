import { inMode } from './mode'
import type { AnyObject } from './types'

export const UseMock = (_: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  if (typeof descriptor.value !== 'function') {
    throw new Error('Mock decorator can only be applied to methods')
  }

  if (inMode('MOCK')) {
    descriptor.value = async function (...args: any[]) {
      const getMockService = Reflect.get(this, 'getMockService')
      if (typeof getMockService !== 'function') {
        throw new Error('getMockService is not a function')
      }

      const mockServicePromise = getMockService()
      if (!(mockServicePromise instanceof Promise)) {
        throw new Error('getMockService should return a Promise')
      }

      return mockServicePromise.then((mockService: AnyObject) => {
        const mockFn = Reflect.get(mockService, propertyKey)
        if (typeof mockFn !== 'function') {
          throw new Error(`${propertyKey} is not a method of the mock service`)
        }

        return mockService[propertyKey](...args)
      })
    }
  }

  return descriptor
}
