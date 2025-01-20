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

2. 导入样式。

```typescript
import 'components/dist/css/components.css'
```

3. 引入组件使用。

```vue
<script setup lang="ts">
import { GIcon } from 'components'
</script>

<template>
  <GIcon name="name"></GIcon>
</template>
```

> 不全局注册组件，因为会影响tree shaking。
