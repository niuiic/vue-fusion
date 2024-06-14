import { toStr } from 'fx-flow'

export const trace = (...msgs: unknown[]) => {
  console.trace('%c' + msgs.map(toStr).join(' '), 'color: red')
}
