import { localUniqId } from '@/id'
import type { AnyObject } from 'fx-flow'

type AnyClass = new (id: string, ...rest: any[]) => AnyObject

export const useEntityFactory = <T extends AnyClass>(constructor: T) => {
  type Instance = InstanceType<T>

  const factory = (args?: Partial<Omit<Instance, 'id'>>): Instance => {
    if (args === undefined) {
      return new constructor(localUniqId()) as any
    }
    return { ...new constructor(localUniqId()), ...args } as any
  }

  return factory
}
