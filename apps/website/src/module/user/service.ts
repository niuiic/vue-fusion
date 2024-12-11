import type { UserDAO } from './dao'
import { notify, Result } from 'components'
import type { UserEntity } from './entity'
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { inject, injectable } from 'inversify'
import { userModuleSymbols } from './symbol'

@injectable()
export class UserService {
  constructor(@inject(userModuleSymbols.userDAO) protected userDAO: UserDAO) {}

  public users = ref<UserEntity[]>([])

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
    })

    return promise
  }

  async initOrReset() {
    this.users.value = []
    this.queryUsers().catch(() => {})
  }
}
