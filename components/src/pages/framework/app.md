# 应用

## 目录结构

```
src/
  module/ -- 业务模块
    module1/
      dao.ts -- 数据访问层，定义接口函数（包括接口适配逻辑）
      entity.ts -- 实体层，定义数据结构
      index.ts -- 模块入口文件，导出模块接口
      mock.ts -- 模拟数据
      service.ts -- 业务逻辑层，定义业务逻辑函数
  share/ -- 共享空间
  view/ -- 视图层，仅存放页面组件
    page1/
    page2/
  App.vue
  main.ts
```

除了业务与视图分离之外，其余关联文件应放在一个目录下。比如某个组件与其依赖的某张图片。

## 业务模块

以一个简单的用户管理模块为例

- index.ts

```typescript
import { getMockDAOSymbol, UserDAO } from './dao'
import { UserService } from './service'
import { Container } from 'inversify'

export const userModule = new Container()

userModule
  .bind(getMockDAOSymbol)
  .toConstantValue(() => (__MOCK__ ? import('./mock').then((x) => x.userDAOMock) : Promise.resolve()))
userModule.bind(UserDAO).toSelf().inSingletonScope()
userModule.bind(UserService).toSelf().inTransientScope()
```

- service.ts

完成业务操作的全过程。以删除操作为例，应执行打开弹窗，让用户确认删除，调用删除接口，刷新列表。

```typescript
import { UserDAO } from './dao'
import type { IService } from 'components'
import { notify, Result } from 'components'
import type { UserEntity } from './entity'
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { inject, injectable } from 'inversify'

@injectable()
export class UserService implements IService {
  constructor(@inject(UserDAO) protected userDAO: UserDAO) {}

  async setup() {
    this.users.value = []
    await this.queryUsers()
  }

  users = ref<UserEntity[]>([])

  async queryUsers(): Promise<unknown> {
    return this.userDAO
      .queryUsers()
      .then((x) => (this.users.value = x))
      .catch((e) => {
        notify('error', '查询用户列表失败')
        throw e
      })
  }

  async deleteUser({ id }: Pick<UserEntity, 'id'>): Promise<unknown> {
    const { promise, resolve, reject } = Promise.withResolvers()

    ElMessageBox.alert('确认删除该用户？', '删除', {
      confirmButtonText: '确认',
      callback: (action: string) => {
        if (action === 'cancel') {
          resolve(Result.Cancel)
          return
        }

        this.userDAO
          .deleteUser({ id })
          .then(() => {
            resolve(Result.Done)
            notify('success', '删除用户成功')
            this.queryUsers().catch(() => {})
          })
          .catch((e) => {
            notify('error', '删除用户失败')
            reject(e)
          })
      }
    }).catch(() => {})

    return promise
  }
}
```

- dao.ts

```typescript
import { mock, MockedDAO } from 'components'
import type { UserEntity } from './entity'
import type { UserDAOMock } from './mock'
import { inject, injectable } from 'inversify'

export interface IUserDAO {
  queryUsers(): Promise<UserEntity[]>
  deleteUser(args: Pick<UserEntity, 'id'>): Promise<unknown>
}

export const getMockDAOSymbol = Symbol()

@injectable()
export class UserDAO extends MockedDAO<IUserDAO> implements IUserDAO {
  constructor(@inject(getMockDAOSymbol) protected getMockDAO: () => Promise<UserDAOMock>) {
    super()
  }

  @mock
  async queryUsers(): Promise<UserEntity[]> {
    throw new Error('not implemented')
  }

  @mock
  async deleteUser(_: Pick<UserEntity, 'id'>): Promise<unknown> {
    throw new Error('not implemented')
  }
}
```

- mock.ts

```typescript
import type { UserEntity } from './entity'
import { newUser } from './entity'
import type { IUserDAO } from './dao'
import { injectable } from 'inversify'
import { assert } from 'components'

@injectable()
export class UserDAOMock implements IUserDAO {
  private users = [newUser({ name: '用户1' }), newUser({ name: '用户2' })]

  async queryUsers(): Promise<UserEntity[]> {
    return structuredClone(this.users)
  }

  async deleteUser(args: Pick<UserEntity, 'id'>): Promise<unknown> {
    const index = this.users.findIndex((user) => user.id === args.id)
    assert(index !== -1, 'User not found')

    this.users.splice(index, 1)
    return
  }
}

export const userDAOMock = new UserDAOMock()
```

- entity.ts

```typescript
import { useEntityFactory } from 'components'

export class UserEntity {
  constructor(
    public id: string,
    public name = '用户名'
  ) {}
}

export const newUser = useEntityFactory(UserEntity)
```

为提高复用率，并降低错误率，应尽可能将业务逻辑按单一职责分割为小组件。为降低组合难度，使用IOC容器组装这些组件。

以上是完整的做法，仅适用于复杂业务。对于简单业务，仅定义接口即可。以总体态势为例。

`module1/index.ts`

```typescript
export const queryXXX = async () => {
  if (__MOCK__) {
    return 'xxx'
  }

  return request.get('xxx')
}
```

`XXX.vue`

```typescript
const [data, loading] = useData(queryXXX, 'xxx')
```
