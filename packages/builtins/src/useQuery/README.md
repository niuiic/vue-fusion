# useQuery

## 用法

1. 定义query。

```typescript
import { ok } from 'builtins'

const queryFn = (args: { num: number }) => Promise.resolve(ok(num))

const [data, loading, query] = useQuery(queryFn)

// useQuery的第二个参数
// options?: {
//   shallowRefData?: boolean
// }
```

2. 使用

```typescript
query({ num: 1 })

// query的第二个参数
// interface Options<T> {
//   debounce: number | false
//   polling: number | false
//   onOk: (data: T) => void
//   onErr: (err: string) => void
//   updateData: (oldData: T | undefined, newData: T, setData: (data: T) => void) => void
// }

// 默认值
// const updateData = (_: Data | undefined, newData: Data, setData: (data: Data) => void) => setData(newData)
//     const fixedOptions: Options<Data> = {
//       debounce: options?.debounce ?? false,
//       polling: options?.polling ?? false,
//       onOk: options?.onOk ?? doNothing,
//       onErr: options?.onErr ?? notify('error'),
//       updateData: options?.updateData ?? updateData
//     }
```

> 同时设置polling和debounce为数字，则debounce无效
