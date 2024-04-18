import type { Route } from 'builtins'

export const routes: Route[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/overview',
    meta: {},
    children: [
      {
        name: 'overview',
        path: 'overview',
        page: 'overview/Overview',
        meta: {
          label: '总体态势',
          navLevel: 1
        }
      }
    ]
  }
]
