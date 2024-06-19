# mock

## 用法

定义mock函数。

```typescript
import { mock, ok } from 'builtins'

export const queryXxx = mock<{ input: number }, { output: number }>((args) => ok({ output: args.input }))
```
