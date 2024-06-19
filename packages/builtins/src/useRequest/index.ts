import { logErr } from '@/log'
import { notify } from '@/notify'
import type { Result } from '@/result'
import { err } from '@/result'
import type { Ref, ShallowRef } from 'vue'
import { onUnmounted, ref, shallowRef } from 'vue'

type Fn = (args: any) => Result<any> | Promise<Result<any>>
type UnwrapResult<T> = T extends Result<infer U> ? U : T

interface Options<T> {
  debounce: number | false
  polling: number | false
  /**
   * 在updateData后执行
   * data等同于updateData选项的newData
   */
  onOk: (data: T) => void
  onErr: (err: string) => void
  updateData: (oldData: T | undefined, newData: T, setData: (data: T) => void) => void
}

const doNothing = () => {}
const updateData = (_: any, newData: any, setData: (data: any) => void) => setData(newData)

export const useRequest = <T extends Fn, Data = UnwrapResult<Awaited<ReturnType<T>>>, Args = Parameters<T>[0]>(
  fn: T,
  options?: {
    shallowRefData?: boolean
  }
): [
  data: ShallowRef<Data | undefined> | Ref<Data | undefined>,
  loading: Ref<boolean>,
  request: (args: Args, Options?: Partial<Options<Data>>) => void
] => {
  const data = options?.shallowRefData ? shallowRef<Data>() : ref<Data>()
  const setData = (newData: Data) => (data.value = newData)
  const loading = ref(false)
  let pollingTimer: any
  let debounceTimer: any
  let requestCount = 0

  const request = (args: Args, options?: Partial<Options<Data>>): void => {
    const fixedOptions: Options<Data> = {
      debounce: options?.debounce ?? false,
      polling: options?.polling ?? false,
      onOk: options?.onOk ?? doNothing,
      onErr: options?.onErr ?? notify('error'),
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
        logErr('useRequest:', e)
        res = err('请求过程中发生错误')
      }
      if (requestCount !== requestNum) {
        return
      }
      loading.value = false
      if (!res.ok) {
        options.onErr(res.err)
        return
      }

      fixedOptions.updateData(data.value, res.data, setData)
      options.onOk(res.data)
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
    pollingTimer && clearInterval(pollingTimer)
    debounceTimer && clearTimeout(debounceTimer)
  })

  return [data, loading, request]
}
