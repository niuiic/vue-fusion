import type { AnyFunction } from '@/types'

/** 用户输入延迟时间 */
export const INPUT_DELAY = 500
/** 窗口大小变化延迟时间 */
export const RESIZE_DELAY = 200
/** 窗口滚动延迟时间 */
export const SCROLL_DELAY = 200

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
