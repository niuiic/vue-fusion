import { inMode } from '@/components/mode'

type BusinessFn<A, R> = (args: A) => Promise<R>

export const business =
  <A, R>(impl?: BusinessFn<A, R>, mock?: BusinessFn<A, R>, useMock = true) =>
  async (args: A): Promise<R> => {
    if (inMode('MOCK') && mock && useMock) {
      return mock(args)
    }
    if (!impl) {
      throw new Error('no implementation')
    }
    return impl(args)
  }
