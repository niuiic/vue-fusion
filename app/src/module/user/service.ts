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
