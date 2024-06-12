# components

## 开发组件

1. 在`src/components`下编写组件。组件名以`G`开头，统一在`index.ts`中具名导出。
2. 在`src/pages`下编写测试用例、示例等。统一在`index.ts`中导出。其中`page`变量导出页面组件，`codeList`变量导出代码。
3. 使用`pnpm dev --filter components`打开页面，点击组件名进入组件页面查看效果。

组件依赖的第三方库应在`vite.lib.config.ts`中的`build.rollupOptions.external`处设置为使用外部依赖。

组件库中不可全局注册`element-plus`，需要时手动引入。

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

> 建议不要全局注册组件，因为会影响tree shaking，最好在使用时手动引入。若手动引入，则无需进行以下步骤。

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
