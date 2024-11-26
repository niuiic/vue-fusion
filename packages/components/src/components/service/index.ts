import { inMode } from '@/components/mode'

type ServiceFn<A, R> = (args: A) => Promise<R>

export const service =
  <A, R>(impl?: ServiceFn<A, R>, mock?: ServiceFn<A, R>, useMock = true) =>
  async (args: A): Promise<R> => {
    if (inMode('MOCK') && mock && useMock) {
      return mock(args)
    }
    if (!impl) {
      throw new Error('no implementation')
    }
    return impl(args)
  }
