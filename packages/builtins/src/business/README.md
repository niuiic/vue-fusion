# business

## 用法

1. 注册模式。

```typescript
import { registerMode } from 'builtins'

registerMode({ DEV: __DEV__, MOCK: __MOCK__ })
```

2. 注册business。

```typescript
import { business, ok } from 'builtins'

const queryXxxBiz = business<{ input: string }, { output: string }>(
  async (args) => ok({ output: args.input }),
  () => import('xxx').then((x) => x.queryXxxMock)
)
```

`queryXxxBiz`的类型为`(args: { input: string }) => Promise<{ output: string }>`。符合以下三个条件则调用第二个参数，否则调用第一个参数。

- registerMode注册MOCK为true
- business存在第二个参数
- business的第三个参数不为false
