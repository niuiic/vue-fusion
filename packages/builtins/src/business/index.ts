import type { Result } from 'fx-flow'
import { err, toStr } from 'fx-flow'

type BusinessFn<A, R> = (args: A) => Promise<Result<R>>

let mode: string

export const registerMode = (x: 'mock' | 'other') => (mode = x)

export const business =
  <A, R>(impl: BusinessFn<A, R>, mock?: BusinessFn<A, R>, useMock = true) =>
  async (args: A): Promise<Result<R>> => {
    const fn = mode === 'mock' && mock && useMock ? mock : impl
    return fn(args).catch((e) => {
      if (__DEV__) {
        console.error(e)
        return err('请求过程中发生错误: ' + toStr(e))
      }
      return err('请求过程中发生错误')
    })
  }
