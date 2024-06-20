import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

export const pages = import.meta.glob(['../pages/**/index.ts', '!../pages/**/components/**/index.ts'])

export const entries = Object.keys(pages).map((x) => {
  const matched = x.match(/\.\.\/pages\/(.+)\/index\.ts/)
  if (!matched) {
    throw new Error(`entry ${x} is invalid`)
  }
  return { name: matched[1], entry: x }
})

const routes: RouteRecordRaw[] = entries.map(({ name, entry }) => ({
  name,
  path: '/' + name,
  component: () => pages[entry]().then((y: any) => y.page())
}))

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/' + entries[0],
      children: routes
    }
  ]
})
