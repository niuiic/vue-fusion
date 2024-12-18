import { getMockDAOSymbol, UserDAO } from './dao'
import { UserService } from './service'
import { Container } from 'inversify'

export const userModule = new Container()

userModule
  .bind(getMockDAOSymbol)
  .toConstantValue(() => (__MOCK__ ? import('./mock').then((x) => x.userDAOMock) : Promise.resolve()))
userModule.bind(UserDAO).toSelf().inSingletonScope()
userModule.bind(UserService).toSelf().inTransientScope()
