import { inMode } from './mode'
import type { AnyObject } from './types'

export const Mock = (_: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  if (typeof descriptor.value !== 'function') {
    throw new Error('Mock decorator can only be applied to methods')
  }

  if (inMode('MOCK')) {
    descriptor.value = async function (...args: any[]) {
      const getMockDAO = Reflect.get(this, 'getMockDAO')
      if (typeof getMockDAO !== 'function') {
        throw new Error('getMockDAO is not a function')
      }

      const mockDAOPromise = getMockDAO()
      if (!(mockDAOPromise instanceof Promise)) {
        throw new Error('getMockDAO should return a Promise')
      }

      return mockDAOPromise.then((mockDAO: AnyObject) => {
        const mockFn = Reflect.get(mockDAO, propertyKey)
        if (typeof mockFn !== 'function') {
          throw new Error(`${propertyKey} is not a method of the mock service`)
        }

        return mockDAO[propertyKey](...args)
      })
    }
  }

  return descriptor
}
