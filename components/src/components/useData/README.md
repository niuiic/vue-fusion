简化数据查询操作，自动实现数据加载、轮询等功能。

```typescript
function useData<T>(
  queryData: () => Promise<T>,
  dataName: string,
  updateInterval?: number
): [data: Ref<T | undefined>, loading: Ref<boolean>]
```
