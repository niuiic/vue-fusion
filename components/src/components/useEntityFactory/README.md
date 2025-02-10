# useEntityFactory

```typescript
import { useEntityFactory } from 'components'

class UserEntity {
  constructor(
    public id: string,
    public name = '用户名'
  ) {}
}

// 入参必须是一个包含成员id的类
const newUser = useEntityFactory(UserEntity)

// 可传入该类除了id的其他成员，如果不传，则使用默认值
const user = newUser({ name: '张三' })
```
