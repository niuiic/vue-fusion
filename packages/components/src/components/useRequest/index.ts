import type { Ref, ShallowRef } from 'vue'
import { onUnmounted, ref, shallowRef } from 'vue'

type Fn = (args: any) => any

interface Options<T> {
  debounce: number | false
  polling: number | false
  /**
   * 在updateData后执行
   * data等同于updateData选项的newData
   */
  onOk: (data: T) => void
  onErr: (err: unknown) => void
  updateData: (
    oldData: T | undefined,
    newData: T,
    setData: (data: T) => void
  ) => void
}

const doNothing = () => {}
const updateData = (_: any, newData: any, setData: (data: any) => void) =>
  setData(newData)

export const useRequest = <
  T extends Fn,
  Data = Awaited<ReturnType<T>>,
  Args = Parameters<T>[0]
>(
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
      onErr: options?.onErr ?? doNothing,
      updateData: options?.updateData ?? updateData
    }

    const task = async (args: Args) => {
      requestCount += 1
      const requestNum = requestCount

      loading.value = true

      const result = Promise.resolve(args).then(fn)
      result.then((x) => {
        if (requestCount !== requestNum) {
          return
        }

        fixedOptions.updateData(data.value, x, setData)
        fixedOptions.onOk(x)
      })
      result.catch((e) => {
        if (requestCount !== requestNum) {
          return
        }

        fixedOptions.onErr(e)
      })
      result.finally(() => {
        if (requestCount !== requestNum) {
          return
        }

        loading.value = false
      })
    }

    if (fixedOptions.polling !== false) {
      pollingTimer && clearInterval(pollingTimer)
      pollingTimer = setInterval(() => task(args), fixedOptions.polling)
      return
    }

    if (fixedOptions.debounce !== false) {
      debounceTimer && clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => task(args), fixedOptions.debounce)
      return
    }

    task(args)
  }

  onUnmounted(() => {
    pollingTimer && clearInterval(pollingTimer)
    debounceTimer && clearTimeout(debounceTimer)
  })

  return [data, loading, request]
}
