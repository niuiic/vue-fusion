```typescript
// 假设module模块的默认导出是函数。
const fn = useAsyncFn(() => import('./module').then((x) => x.default))
// 得到的fn参数与导出函数一致，但返回值是一个promise。
```
