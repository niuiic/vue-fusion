import type { AnyObject } from 'fx-flow'

type AnyClass = new (id: string, ...rest: any[]) => AnyObject

export const useEntityFactory = <T extends AnyClass>(constructor: T) => {
  let id = 0

  type Instance = InstanceType<T>

  const factory = (args?: Partial<Omit<Instance, 'id'>>): Instance => {
    id = id + 1
    if (args === undefined) {
      return new constructor(String(id)) as any
    }
    return { ...new constructor(String(id)), ...args } as any
  }

  return {
    factory
  }
}
