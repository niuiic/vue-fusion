import type { AnyFunction } from '@/components/types'

export const useAsyncFn =
  <T>(
    loadFn: () => Promise<T>
  ): ((
    ...args: T extends AnyFunction ? Parameters<T> : any[]
  ) => T extends AnyFunction ? Promise<Awaited<ReturnType<T>>> : Promise<any>) =>
  (...args: any[]) =>
    loadFn().then((fn) => (fn as AnyFunction)(...args)) as any
