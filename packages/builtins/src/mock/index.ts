import type { Result } from 'fx-flow'

export const mock = <A, R>(fn: (args: A) => Promise<Result<R>>) => fn
