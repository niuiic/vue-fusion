import type { AnyFunction } from './types'

export const useDynFn =
  <T extends AnyFunction>(loadFn: () => Promise<T>): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) =>
  (...args: any[]) =>
    loadFn().then((fn) => fn(...args))
