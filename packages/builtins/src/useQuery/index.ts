import { inMode } from '@/mode'
import { notify } from '@/notify'
import type { Result } from 'fx-flow'
import { err, toStr } from 'fx-flow'
import type { Ref, ShallowRef } from 'vue'
import { onUnmounted, ref, shallowRef } from 'vue'

type Fn = (args: any) => Result<any> | Promise<Result<any>>
type UnwrapResult<T> = T extends Result<infer U> ? U : T

interface Options<T> {
  debounce: number | false
  polling: number | false
  onSuccess: (data: T) => void
  onError: (err: string) => void
  updateData: (oldData: T | undefined, newData: T, setData: (data: T) => void) => void
}

const doNothing = () => {}

export const useQuery = <T extends Fn, Data = UnwrapResult<Awaited<ReturnType<T>>>, Args = Parameters<T>[0]>(
  fn: T,
  options?: {
    shallowRefData?: boolean
  }
): [
  data: ShallowRef<Data | undefined> | Ref<Data | undefined>,
  loading: Ref<boolean>,
  query: (args: Args, Options?: Partial<Options<Data>>) => void
] => {
  const data = options?.shallowRefData ? shallowRef<Data>() : ref<Data>()
  const setData = (newData: Data) => (data.value = newData)
  const loading = ref(false)
  let pollingTimer: any
  let debounceTimer: any
  let requestCount = 0
  let unmounted = false

  const query = (args: Args, options?: Partial<Options<Data>>): void => {
    const updateData = (_: Data | undefined, newData: Data, setData: (data: Data) => void) => setData(newData)
    const fixedOptions: Options<Data> = {
      debounce: options?.debounce ?? false,
      polling: options?.polling ?? false,
      onSuccess: options?.onSuccess ?? doNothing,
      onError: options?.onError ?? notify('error'),
      updateData: options?.updateData ?? updateData
    }

    const task = async (args: Args, options: Options<Data>) => {
      requestCount = requestCount + 1
      const requestNum = requestCount

      loading.value = true

      let res
      try {
        res = await fn(args)
      } catch (e) {
        inMode('DEV') && console.error('useQuery:', toStr(e))
        res = err('请求过程中发生错误')
      }
      if (unmounted) {
        return
      }
      if (requestCount !== requestNum) {
        return
      }
      loading.value = false
      if (res.isErr()) {
        options.onError(res.error()!)
        return
      }

      const resData = res.unwrap()
      fixedOptions.updateData(data.value, resData, setData)
      options.onSuccess(resData)
    }

    if (fixedOptions.polling !== false) {
      pollingTimer && clearInterval(pollingTimer)
      pollingTimer = setInterval(() => task(args, fixedOptions), fixedOptions.polling)
      return
    }

    if (fixedOptions.debounce === false) {
      task(args, fixedOptions)
      return
    }

    debounceTimer && clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => task(args, fixedOptions), fixedOptions.debounce)
  }

  onUnmounted(() => {
    unmounted = true
    pollingTimer && clearInterval(pollingTimer)
    debounceTimer && clearTimeout(debounceTimer)
  })

  return [data, loading, query]
}
