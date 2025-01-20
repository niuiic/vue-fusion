# router

## 用法

1. 注册页面。

在`src/main.ts`中。

```typescript
import { registerPage } from 'components'

// components目录下不是页面组件，可以排除
registerPage(import.meta.glob(['./view/**/*.vue', '!**/components/**/*.vue']), './view/')
```

`registerPage`的第二个参数为默认前缀，`usePage`中不再需要传入该前缀，如`./view/pages/xxx/Xxx.vue`在`Route.page`中只需指定为`xxx/Xxx`。

3. 创建router。

```typescript
import { toRouteRecordRaws } from 'components'
import type { Route } from 'components'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Route[] = [
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
          level: 1
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: toRouteRecordRaws(routes)
})
```
