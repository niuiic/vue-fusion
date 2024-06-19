import type { AnyFunction } from '@/types'

export const useDebouncedFn = <T extends AnyFunction>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timer: any

  const debouncedFn = (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn
}
