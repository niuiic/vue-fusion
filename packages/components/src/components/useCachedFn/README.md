# useCachedFn

## 用法

```typescript
const queryFn = (args: { value: number }) => Promise.resolve(args.value)

// (args: A, force?: boolean) => Promise<R>
// 设置force为true则不使用缓存，其他情况下始终使用缓存
const cacheQueryFn = useCachedFn(queryFn)
```
