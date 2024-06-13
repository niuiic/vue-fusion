import { localUniqId } from '@/id'

export const jsonp = <T>(url: string) =>
  new Promise<T>((resolve, reject) => {
    const callbackName = 'jsonp_callback_' + localUniqId()

    window[callbackName as any] = function (data: T) {
      delete window[callbackName as any]
      const script = document.getElementById(callbackName)
      script?.removeEventListener('error', reject)
      script?.parentNode?.removeChild(script)
      resolve(data)
    } as any

    const script = document.createElement('script')
    script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName
    script.id = callbackName
    script.addEventListener('error', reject)

    document.head.appendChild(script)
  })
