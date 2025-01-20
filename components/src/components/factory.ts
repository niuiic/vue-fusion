import type { AnyObject } from '@/components/types'

type AnyClass = new (id: string, ...rest: any[]) => AnyObject

export const useEntityFactory = <T extends AnyClass>(constructor: T) => {
  type Instance = InstanceType<T>

  let id = -1

  const factory = (args?: Partial<Omit<Instance, 'id'>>): Instance => {
    id = id + 1
    if (args === undefined) {
      return new constructor(String(id)) as any
    }
    return { ...new constructor(String(id)), ...args } as any
  }

  return factory
}
