import type { RouteRecordRaw } from 'vue-router'
import { createRouter as createRouter_, createWebHashHistory } from 'vue-router'
import { usePage } from './page'
import type { Route } from './type'

const toRouteRecordRaw = (route: Route, level: number): RouteRecordRaw => ({
  ...route,
  component: route.page ? usePage(route.page) : undefined,
  meta: { ...route.meta, level },
  path: route.path,
  children: route.children ? route.children.map((x) => toRouteRecordRaw(x, level + 1)) : []
})

export const createRouter = (routes: Route[]) =>
  createRouter_({ history: createWebHashHistory(), routes: routes.map((x) => toRouteRecordRaw(x, 1)) })
