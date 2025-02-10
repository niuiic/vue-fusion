# emitter

- 创建emitter。

```typescript
import { Emitter } from 'components'

interface Events {
  foo(data: number): void
}
const emitter = new Emitter<Events>()
```

- 注册处理函数。

```typescript
const handler = (data) => data + 1
// 注册
emitter.on('foo', handler)
// 注册，但只可触发一次
emitter.once('foo', handler)
// 注销
emitter.off('foo', handler)
// 注销所有处理函数
emitter.dispose()
```

- 触发事件。

```typescript
const [result] = emitter.emit('foo', 1)
assert(result === 2)
```
