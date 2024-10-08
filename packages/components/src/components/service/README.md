# service

## 用法

1. 注册模式。

```typescript
import { registerMode } from 'components'

registerMode({ DEV: __DEV__, MOCK: __MOCK__ })
```

2. 注册service。

```typescript
import { service, useAsyncFn } from 'components'

const queryXxxSvc = service<{ input: string }, { output: string }>(
  async (args) => ({ output: args.input }),
  useAsyncFn(() => import('xxx').then((x) => x.queryXxxMock))
)
```

`queryXxxSvc`的类型为`(args: { input: string }) => Promise<{ output: string }>`。符合以下三个条件则调用第二个参数，否则调用第一个参数。

- registerMode注册MOCK为true
- service存在第二个参数
- service的第三个参数不为false
