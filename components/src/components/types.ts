export type AnyObject = Record<string | number | symbol, any>

export type AnyFunction = (...args: any[]) => any

export type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

export type ComponentEmits<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$emit'] : AnyFunction

export type FixedPromise<T> = Promise<Awaited<T>>

export type MaybePromise<T> = T | FixedPromise<T>

export abstract class MockedDAO<T> {
  protected abstract getMockDAO(): Promise<T>
}
