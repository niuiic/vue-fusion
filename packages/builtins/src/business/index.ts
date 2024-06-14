import { logErr } from '@/log'
import { inMode } from '@/mode'
import type { Result } from 'fx-flow'
import { err } from 'fx-flow'

type BusinessFn<A, R> = (args: A) => Promise<Result<R>>

export const business =
  <A, R>(impl: BusinessFn<A, R>, mock?: BusinessFn<A, R>, useMock = true) =>
  async (args: A): Promise<Result<R>> => {
    const fn = inMode('MOCK') && mock && useMock ? mock : impl
    return fn(args).catch((e) => {
      logErr('business:', e)
      return err('请求过程中发生错误')
    })
  }
