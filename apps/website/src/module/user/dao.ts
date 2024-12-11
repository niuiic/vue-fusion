import { mock, MockedDAO } from 'components'
import type { UserEntity } from './entity'
import type { UserDAOMock } from './mock'
import { inject, injectable } from 'inversify'

export interface IUserDAO {
  queryUsers(): Promise<UserEntity[]>
  deleteUser(args: Pick<UserEntity, 'id'>): Promise<unknown>
}

@injectable()
export class UserDAO extends MockedDAO<IUserDAO> implements IUserDAO {
  constructor(@inject('getMockDAO') protected getMockDAO: () => Promise<UserDAOMock>) {
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
