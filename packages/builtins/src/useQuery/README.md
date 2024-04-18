# useQuery

## 用法

1. 定义query。

```typescript
import { ok } from 'fx-flow'

const queryFn = (args: { num: number }) => Promise.resolve(ok(num))

const [data, loading, query] = useQuery(queryFn)

// useQuery的第二个参数
// options?: {
//   shallowRefData?: boolean
// }
```

2. 使用

```typescript
query(
  {
    num: 1
  },
  {
    throttling: false
  }
)

// query的第二个参数
// interface Options<T> {
//   throttling?: number | false
//   polling?: number | false
//   onSuccess?: (data: T) => void
//   onError?: (err: string) => void
//   updateData?: (oldData: T | undefined, newData: T, setData: (data: T) => void) => void
// }

// 默认值
// const updateData = (_: Data | undefined, newData: Data, setData: (data: Data) => void) => setData(newData)
// const fixedOptions: Options<Data> = {
//   throttling: options?.throttling ?? 500,
//   polling: options?.polling ?? false,
//   onSuccess: options?.onSuccess ?? doNothing,
//   onError: options?.onError ?? notify('error'),
//   updateData: options?.updateData ?? updateData
// }
```
