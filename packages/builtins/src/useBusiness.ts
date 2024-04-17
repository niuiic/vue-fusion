import type { Result } from 'fx-flow'
import { err } from 'fx-flow'
import { onUnmounted, ref } from 'vue'
import { notify } from './notify'

type Fn = (args: any) => Result<any> | Promise<Result<any>>
type UnwrapResult<T> = T extends Result<infer U> ? U : T

interface Options<T> {
  throttling: boolean
  interval: number
  polling: number | false
  onSuccess: (data: T) => void
  onError: (err: string) => void
}

const doNothing = () => {}

export const useBusiness = <T extends Fn>(business: T) => {
  type Data = UnwrapResult<Awaited<ReturnType<T>>>
  type Args = Parameters<T>[0]

  const data = ref<Data>()
  const loading = ref(false)
  let timer: any

  let lastExecTime: number
  let taskWaiting: { args: Args; options: Options<Data> } | undefined
  let requestCount = 0

  const trigger = (args: Args, options?: Partial<Options<Data>>): void => {
    const fixedOptions: Options<Data> = {
      throttling: options?.throttling ?? true,
      interval: options?.interval ?? 500,
      polling: options?.polling ?? false,
      onSuccess: options?.onSuccess ?? doNothing,
      onError: options?.onError ?? notify('error')
    }

    const task = async (args: Args, options: Options<Data>) => {
      requestCount = requestCount + 1
      const requestNum = requestCount

      lastExecTime = new Date().getTime()
      loading.value = true

      let res
      try {
        res = await business(args)
      } catch {
        res = err('请求过程中发生错误')
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
      data.value = resData
      options.onSuccess(resData)

      if (options.polling !== false) {
        if (timer) {
          clearInterval(timer)
        }
        timer = setInterval(() => task(args, options), options.polling)
      }
    }

    if (fixedOptions.throttling === false) {
      task(args, fixedOptions)
      return
    }

    const now = new Date().getTime()
    if (lastExecTime && now - lastExecTime < fixedOptions.interval) {
      if (!taskWaiting) {
        setTimeout(
          () => {
            task(taskWaiting!.args, taskWaiting!.options)
            taskWaiting = undefined
          },
          fixedOptions.interval + lastExecTime - now
        )
      }
      taskWaiting = { args, options: fixedOptions }
    }

    if (!taskWaiting) {
      task(args, fixedOptions)
    }
  }

  onUnmounted(() => timer && clearInterval(timer))

  return {
    data,
    loading,
    trigger
  }
}
