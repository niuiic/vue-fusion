import { toStr } from '@/toStr'

export const logErr = (...msgs: unknown[]) => {
  console.trace('%c' + msgs.map(toStr).join(' '), 'color: red')
}
