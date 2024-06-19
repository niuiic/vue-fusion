import type { Result } from '@/result'

export const mock = <A, R>(fn: (args: A) => Promise<Result<R>>) => fn
