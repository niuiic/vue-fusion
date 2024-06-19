import { logErr } from '@/log'
import { inMode } from '@/mode'
import type { Result } from '@/result'
import { err } from '@/result'

type BusinessFn<A, R> = (args: A) => Promise<Result<R>>

export const business =
  <A, R>(impl: BusinessFn<A, R>, mock?: () => Promise<BusinessFn<A, R>>, useMock = true) =>
  async (args: A): Promise<Result<R>> => {
    if (inMode('MOCK') && mock && useMock) {
      return mock()
        .then((fn) => fn(args))
        .catch((e) => {
          logErr('business:', e)
          return err('请求过程中发生错误')
        })
    }
    return impl(args).catch((e) => {
      logErr('business:', e)
      return err('请求过程中发生错误')
    })
  }
