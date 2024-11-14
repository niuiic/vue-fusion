import type { RouteRecordRaw } from 'vue-router'
import { usePage } from './page'
import type { Route } from './type'

const toRouteRecordRaw = (route: Route, level: number): RouteRecordRaw => ({
  name: route.name,
  path: route.path,
  redirect: route.redirect,
  meta: { ...route.meta, level },
  component: route.page ? usePage(route.page) : undefined,
  children: route.children
    ? route.children.map((x) => toRouteRecordRaw(x, level + 1))
    : []
})

export const toRouteRecordRaws = (routes: Route[]) =>
  routes.map((x) => toRouteRecordRaw(x, 1))
