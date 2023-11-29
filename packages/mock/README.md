# mock

## 用法

1. 引入包。

`package.json`

```json
{
  "dependencies": {
    "mock": "workspace:*",
    "result": "workspace:*"
  }
}
```

2. 定义mock函数。

```typescript
import { ok } from 'result'
import { mock } from 'mock'

export const queryXxx = mock<{ input: number }, { output: number }>((args) => ok({ output: args.input }))
```

3. 注册mock。

一般在`src/main.ts`中注册。

```typescript
import { registerMock } from 'mock'

registerMock(import.meta.glob('./mock/**/*.ts'), './mock/')
```

3. 使用mock。

```typescript
useMock('模块名', 'mock函数名')
```

本质上以上语句的值为`(...args) => import(模块名).then((module) => module[mock函数名](...args))`。

模块名一般为项目根目录到指定文件的相对位置，如`./mock/xxx.ts`。若`registerMock`指定了第二个参数，则可以省略这部分，直接写成`xxx.ts`。
