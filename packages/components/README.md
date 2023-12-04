# components

## 开发组件

1. 在`src/components`下编写组件。组件名以`G`开头，统一在`index.ts`中具名导出。
2. 在`src/pages`下编写测试用例、示例等。统一在`index.ts`中使用`export default`导出。
3. 使用`pnpm dev --filter components`打开页面，点击组件名进入组件页面查看效果。

组件依赖的包应在`vite.config.ts`中的`build.rollupOptions.external`处设置为使用外部依赖。

## 使用组件

1. 引入包。

`package.json`

```json
{
  "dependencies": {
    "components": "workspace:*"
  }
}
```

2. 全局注册组件。

```typescript
import components from 'components'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(components)
```

3. 导入样式。

```typescript
import 'components/dist/css/style.css'
```

4. 引入类型。

在`tsconfig.json`中。

```json
{
  "compilerOptions": {
    "types": ["components/dist/components"]
  }
}
```

5. 使用组件。

```vue
<template>
  <g-icon name="name"></g-icon>
</template>
```
