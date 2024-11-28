import type { IUserDAO, UserDAO } from './dao'
import type { DAOToService } from 'components'

export class UserService implements DAOToService<IUserDAO> {
  static inject = ['UserDAO'] as const
  constructor(protected userDAO: UserDAO) {}

  queryUser(..._args: any[]): Promise<unknown> {
    throw new Error('Method not implemented.')
  }

  updateUser(_args: string): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
