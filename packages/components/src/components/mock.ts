import { assert } from './assert'
import { inMode } from './mode'
import type { AnyObject } from './types'

export const mock = (_: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  assert(typeof descriptor.value === 'function', 'Mock decorator can only be applied to methods')

  if (inMode('MOCK')) {
    descriptor.value = async function (...args: any[]) {
      const getMockDAO = Reflect.get(this, 'getMockDAO')
      assert(typeof getMockDAO === 'function', 'getMockDAO is not a function')

      const mockDAOPromise = getMockDAO()
      assert(mockDAOPromise instanceof Promise, 'getMockDAO should return a Promise')

      return mockDAOPromise.then((mockDAO: AnyObject) => {
        const mockFn = Reflect.get(mockDAO, propertyKey)
        assert(typeof mockFn === 'function', `${propertyKey} is not a method of the mock service`)

        return mockDAO[propertyKey](...args)
      })
    }
  }

  return descriptor
}
