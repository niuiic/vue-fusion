import { getModes } from '@/mode'
import type { Result } from 'fx-flow'
import { err, toStr } from 'fx-flow'

type BusinessFn<A, R> = (args: A) => Promise<Result<R>>

export const business =
  <A, R>(impl: BusinessFn<A, R>, mock?: BusinessFn<A, R>, useMock = true) =>
  async (args: A): Promise<Result<R>> => {
    const fn = getModes().includes('MOCK') && mock && useMock ? mock : impl
    return fn(args).catch((e) => {
      getModes().includes('DEV') && console.error(toStr(e))
      return err('请求过程中发生错误')
    })
  }
