type Fn<T> = () => T | Promise<T>

export const concurrent = async <T>(
  fns: Fn<T>[],
  limit: number
): Promise<T[]> => {
  const result: T[] = []

  const execFn = async (fn: Fn<T>, i: number) => {
    try {
      const res = await fn()
      result[i] = res
    } finally {
      if (index < fns.length) {
        index = index + 1
        await execFn(fns[index - 1], index - 1)
      }
    }
  }

  let index = Math.min(limit, fns.length)
  await Promise.all(fns.slice(0, index).map((fn, i) => execFn(fn, i)))

  return result
}
