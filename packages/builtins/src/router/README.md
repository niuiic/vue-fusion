# router

## 用法

1. 引入包。

`package.json`

```json
{
  "dependencies": {
    "router": "workspace:*"
  }
}
```

2. 注册页面。

在`src/main.ts`中。

```typescript
import { registerPage } from 'router'

// components目录下不是页面组件，可以排除
registerPage(import.meta.glob(['./view/pages/**/*.vue', '!**/components/**/*.vue']), './view/pages/')
```

`registerPage`的第二个参数为默认前缀，`usePage`中不再需要传入该前缀，如`./view/pages/xxx/Xxx.vue`在`Route.page`中只需指定为`xxx/Xxx`。

3. 创建router。

```typescript
import { createRouter } from 'router'
import type { Route } from 'router'

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
          navLevel: 1
        }
      }
    ]
  }
]

const router = createRouter(routes)
```
