import type { UserEntity } from './entity'
import { newUser } from './entity'
import type { IUserService } from './service'

export class UserServiceMock implements IUserService {
  private users = [newUser({ name: '用户1' }), newUser({ name: '用户2' })]

  async queryUser(args: Pick<UserEntity, 'id'>): Promise<UserEntity> {
    const user = this.users.find((x) => x.id === args.id)
    if (!user) {
      throw new Error('没有该用户')
    }

    return user
  }

  async updateUser(args: UserEntity): Promise<unknown> {
    const user = this.users.find((x) => x.id === args.id)
    if (!user) {
      throw new Error('没有该用户')
    }

    user.name = args.name
    return
  }
}

export const userServiceMock = new UserServiceMock()
