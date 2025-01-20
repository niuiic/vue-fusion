import { assert } from '../assert'

type Pages = Record<string, () => Promise<unknown>>

let pages: Pages
let prefix: string

export const registerPage = (pageMap: Pages, pagePrefix?: string) => {
  pages = pageMap
  if (pagePrefix) {
    prefix = pagePrefix
  }
}

export const usePage = (page: string) => {
  const fixedPage = prefix ? `${prefix}${page}.vue` : `${page}.vue`

  assert(Reflect.has(pages, fixedPage), `usePage: router page ${page} not found`)

  return Reflect.get(pages, fixedPage)
}
