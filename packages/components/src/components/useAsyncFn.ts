import type { AnyFunction } from '@/components/types'

export const useAsyncFn =
  <T extends AnyFunction>(loadFn: () => Promise<T>): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) =>
  (...args: any[]) =>
    loadFn().then((fn) => fn(...args))
