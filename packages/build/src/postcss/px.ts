import type { Plugin } from 'postcss'

export const transformPx: Plugin = {
  postcssPlugin: 'transform-px',
  Declaration(decl) {
    decl.value = trans(decl.value)
  },
  AtRule(atRule) {
    atRule.params = trans(atRule.params)
  }
}

// FIXME: 当存在嵌套括号时，内括号右侧的内容会被误匹配 (niuiic)
const exceptFuncs = ['url']
const regex = {
  px: new RegExp(`(?<!(?:${exceptFuncs.join('|')})\\([^\\)]*)([-\\+]?[\\d.e]+)px`, 'g'),
  opx: new RegExp(`(?<!(?:${exceptFuncs.join('|')})\\([^\\)]*)([-\\+]?[\\d.e]+)opx`, 'g')
}

const transedPx = (val: string) => val.replace(regex.px, (_, v) => `calc(${v} * var(--fpx-one))`)
const transedOPx = (val: string) => val.replace(regex.opx, (_, v) => `calc(${v} * 1pc / 16)`)

const trans = (value: string) => {
  if (value.includes('opx')) {
    return transedOPx(value)
  }
  if (value.includes('px')) {
    return transedPx(value)
  }
  return value
}
