import { Mock } from 'components'
import type { UserEntity } from './entity'
import type { UserDAOMock } from './mock'

export interface IUserDAO {
  queryUser(args: Pick<UserEntity, 'id'>): Promise<UserEntity>
  updateUser(args: UserEntity): Promise<unknown>
}

export class UserDAO implements IUserDAO {
  static inject = ['getMockDAO'] as const
  constructor(protected getMockDAO: () => Promise<UserDAOMock>) {}

  @Mock
  async queryUser(_: Pick<UserEntity, 'id'>): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }

  @Mock
  async updateUser(_: UserEntity): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
