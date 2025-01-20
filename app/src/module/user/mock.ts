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
