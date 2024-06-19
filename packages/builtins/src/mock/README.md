# mock

## 用法

定义mock函数。

```typescript
import { ok } from 'fx-flow'
import { mock } from 'builtins'

export const queryXxx = mock<{ input: number }, { output: number }>((args) => ok({ output: args.input }))
```
