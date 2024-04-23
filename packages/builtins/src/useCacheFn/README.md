# useCacheFn

## 用法

```typescript
const queryFn = (args: { value: number }) => Promise.resolve(args.value)

const [cacheQueryFn, cleanCache] = useCacheFn(queryFn)
// useCacheFn第二个参数
// interface Options<T> {
//   cacheValid: (newArgs: T, oldArgs: T, cacheTime: number) => boolean
// }

// 默认值
// const cacheValid = (_newArgs: A, _oldArgs: A, _cacheTime: number) => {
//   return true
// }

// 使用cacheQueryFn代替queryFn
// 如果cache存在且合法，则不执行queryFn而是直接使用cache
```
