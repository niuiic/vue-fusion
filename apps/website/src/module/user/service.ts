import { Mock } from 'components'
import type { UserEntity } from './entity'
import type { UserServiceMock } from './mock'

export interface IUserService {
  queryUser(args: Pick<UserEntity, 'id'>): Promise<UserEntity>
  updateUser(args: UserEntity): Promise<unknown>
}

export class UserService implements IUserService {
  static inject = ['getMockService'] as const
  constructor(protected getMockService: () => Promise<UserServiceMock>) {}

  @Mock
  async queryUser(_: Pick<UserEntity, 'id'>): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }

  @Mock
  async updateUser(_: UserEntity): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
