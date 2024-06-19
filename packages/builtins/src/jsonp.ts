import { localUniqId } from '@/id'
import type { Result } from '@/result'
import { err, ok } from '@/result'
import { toStr } from '@/toStr'

export const jsonp = <T>(url: string) =>
  new Promise<Result<T>>((resolve) => {
    const callbackName = 'jsonp_callback_' + localUniqId()
    const reject = (x: any) => resolve(err(toStr(x)))

    window[callbackName as any] = function (data: T) {
      delete window[callbackName as any]
      const script = document.getElementById(callbackName)
      script?.removeEventListener('error', reject)
      script?.parentNode?.removeChild(script)
      resolve(ok(data))
    } as any

    const script = document.createElement('script')
    script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName
    script.id = callbackName
    script.addEventListener('error', reject)

    document.head.appendChild(script)
  })
