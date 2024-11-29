import { Mock } from 'components'
import type { UserEntity } from './entity'
import type { UserDAOMock } from './mock'

export interface IUserDAO {
  queryUsers(): Promise<UserEntity[]>
  deleteUser(args: Pick<UserEntity, 'id'>): Promise<unknown>
}

export class UserDAO implements IUserDAO {
  static inject = ['getMockDAO'] as const
  constructor(protected getMockDAO: () => Promise<UserDAOMock>) {}

  @Mock
  async queryUsers(): Promise<UserEntity[]> {
    throw new Error('not implemented')
  }

  @Mock
  async deleteUser(_: Pick<UserEntity, 'id'>): Promise<unknown> {
    throw new Error('not implemented')
  }
}
