import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { CodeProps } from './components/code'

export interface Page {
  component?: () => Promise<{ default: Component }>
  docs?: CodeProps[]
  desc?: string
  name: string
  category?: string
}

const modules = import.meta.glob(['./pages/*/index.ts', '!./pages/*/components/**/index.ts'])

const entries = (await Promise.all(Object.entries(modules).map(([k, v]) => v().then((x: any) => [k, x.default])))) as [
  path: string,
  page: Page
][]

const resolvePath = (path: string) => path.replace(/\//g, '_')
export const routes: RouteRecordRaw[] = entries.map(([path, page]) => ({
  name: resolvePath(path),
  path: '/' + resolvePath(path),
  component: page.component as any,
  meta: { page }
}))

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: routes.length > 0 ? routes[0].path : undefined,
      children: routes
    }
  ]
})
