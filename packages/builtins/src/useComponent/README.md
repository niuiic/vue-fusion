# useComponent

## 用法

1. 定义动态组件

```typescript
import { useComponent } from 'builtins'

const [Example, render, destory, compProps] = useComponent(() => import('./example/Example.vue'))
```

2. 使用动态组件

```vue
<template>
  <component :is="Example" v-bind="compProps"></component>
</template>

<script>
// 调用render引入，挂载组件
// 调用destory销毁组件，释放内存
</script>
```
