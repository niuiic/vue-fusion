import type { UserEntity } from './entity'
import { newUser } from './entity'
import type { IUserDAO } from './dao'

export class UserDAOMock implements IUserDAO {
  private users = [newUser({ name: '用户1' }), newUser({ name: '用户2' })]

  async queryUsers(): Promise<UserEntity[]> {
    return structuredClone(this.users)
  }

  async deleteUser(args: Pick<UserEntity, 'id'>): Promise<unknown> {
    const index = this.users.findIndex((user) => user.id === args.id)
    if (index === -1) {
      throw new Error('User not found')
    }

    this.users.splice(index, 1)
    return
  }
}

export const userDAOMock = new UserDAOMock()
