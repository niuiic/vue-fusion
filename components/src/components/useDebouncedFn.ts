import type { AnyFunction } from '@/components/types'

export const DelayTime = {
  /** 用户输入延迟时间 */
  Input: 500,
  /** 窗口大小变化延迟时间 */
  Resize: 200,
  /** 窗口滚动延迟时间 */
  Scroll: 200
} as const

export const useDebouncedFn = <T extends AnyFunction>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timer: any

  const debouncedFn = (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => fn(...args), delay)
  }

  return debouncedFn
}
