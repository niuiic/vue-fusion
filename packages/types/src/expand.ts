import type { AnyObject } from './object'

export type Expand<T, Ignore = never> = T extends T
  ? T extends Ignore
    ? T
    : T extends (...args: infer A) => Promise<infer R>
      ? (...args: Expand<A, Ignore>) => Promise<Expand<R, Ignore>>
      : T extends (...args: infer A) => infer R
        ? (...args: Expand<A, Ignore>) => Expand<R, Ignore>
        : T extends AnyObject
          ? {
              [K in keyof T]: Expand<T[K], Ignore>
            }
          : T
  : never
