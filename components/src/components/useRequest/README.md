1. 定义query。

```typescript
const queryFn = (args: { num: number }) => Promise.resolve(num)

const [data, loading, query] = useRequest(queryFn)

// useRequest的第二个参数
// options?: {
//   shallowRefData?: boolean
// }
```

2. 使用

```typescript
query({ num: 1 })

// query的第二个参数
interface Options<T> {
  debounce: number | false
  polling: number | false
  /**
   * 在updateData后执行
   * data等同于updateData选项的newData
   */
  onOk: (data: T) => void
  onErr: (err: unknown) => void
  updateData: (oldData: T | undefined, newData: T, setData: (data: T) => void) => void
}

// 默认值
const doNothing = () => {}
const updateData = (_: any, newData: any, setData: (data: any) => void) => setData(newData)
const fixedOptions: Options<Data> = {
  debounce: options?.debounce ?? false,
  polling: options?.polling ?? false,
  onOk: options?.onOk ?? doNothing,
  onErr: options?.onErr ?? doNothing,
  updateData: options?.updateData ?? updateData
}

// 预设延迟时间
export const DelayTime = {
  /** 用户输入延迟时间 */
  Input: 500,
  /** 窗口大小变化延迟时间 */
  Resize: 200,
  /** 窗口滚动延迟时间 */
  Scroll: 200
} as const
```

同时设置polling和debounce为数字，则debounce无效
