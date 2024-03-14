import type { Result } from 'result'
import { err } from 'result'

type BusinessFunc<A, R> = (args: A) => Promise<Result<R>>

let mode: string

export const registerMode = (x: 'mock' | 'other') => (mode = x)

export const business =
  <A, R>(impl: BusinessFunc<A, R>, mock?: BusinessFunc<A, R>, useMock = true) =>
  async (args: A): Promise<Result<R>> => {
    const fn = mode === 'mock' && mock && useMock ? mock : impl
    return fn(args).catch(() => err('请求过程中发生错误'))
  }
