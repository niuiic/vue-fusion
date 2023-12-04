# business

## 用法

1. 引入包。

`package.json`

```json
{
  "dependencies": {
    "business": "workspace:*",
    "result": "workspace:*"
  }
}
```

2. 注册模式。

```typescript
import { registerMode } from 'business'

registerMode(import.meta.env.MODE.includes('mode') ? 'mode' : 'other')
```

3. 注册business。

```typescript
import { business } from 'business'
import { ok } from 'result'

const queryXxxBiz = business<{ input: string }, { output: string }>(
  async (args) => ok({ output: args.input }),
  useMock('xxx', 'queryXxxMock')
)
```

`queryXxxBiz`的类型为`(args: { input: string }) => Promise<{ output: string }>`。在mock模式下会调用第二个参数，非mock模式下调用第一个参数。

可设置`business`的第三个参数为false以暂时停止使用mock。
