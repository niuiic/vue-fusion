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

使用`import.meta.glob('./mock/**/*.ts')`会使匹配的文件被打包到最终产物中，可利用tree shaking在非mock模式下去除该语句。

3. 使用mock。

```typescript
useMock('模块名', 'mock函数名')
```

`useMock`的返回值相当于`(...args) => import(模块名).then((module) => module[mock函数名](...args))`。

实际文件路径为`./mock/xxx/index.ts`和`./mock/xxx.ts`的两个文件模块名为`./mock/xxx`。若`registerMock`指定了第二个参数，则省略这部分，直接写成`xxx`。
