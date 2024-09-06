# business

## 用法

1. 注册模式。

```typescript
import { registerMode } from 'components'

registerMode({ DEV: __DEV__, MOCK: __MOCK__ })
```

2. 注册business。

```typescript
import { business, useAsyncFn } from 'components'

const queryXxxBiz = business<{ input: string }, { output: string }>(
  async (args) => ({ output: args.input }),
  useAsyncFn(() => import('xxx').then((x) => x.queryXxxMock))
)
```

`queryXxxBiz`的类型为`(args: { input: string }) => Promise<{ output: string }>`。符合以下三个条件则调用第二个参数，否则调用第一个参数。

- registerMode注册MOCK为true
- business存在第二个参数
- business的第三个参数不为false
