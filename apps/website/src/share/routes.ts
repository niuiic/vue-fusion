import type { Route } from 'builtins'

export const routes: Route[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/example',
    meta: {},
    children: [
      {
        name: 'example',
        path: 'example',
        page: 'example/Example',
        meta: {
          label: '样例'
        }
      }
    ]
  }
]
