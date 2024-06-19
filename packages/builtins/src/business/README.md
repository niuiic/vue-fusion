# business

## 用法

1. 注册模式。

```typescript
import { registerMode } from 'builtins'

registerMode({ DEV: import.meta.env.MODE.includes('dev'), MOCK: __MOCK__ })
```

2. 注册business。

```typescript
import { business, ok } from 'builtins'

const queryXxxBiz = business<{ input: string }, { output: string }>(
  async (args) => ok({ output: args.input }),
  () => import('xxx').then((x) => x.queryXxxMock)
)
```

`queryXxxBiz`的类型为`() => Promise<(args: { input: string }) => Promise<{ output: string }>>`。在mock模式下会调用第二个参数，非mock模式下调用第一个参数。

可设置`business`的第三个参数为false以暂时停止使用mock。
