import { UserDAO } from './dao'
import { UserService } from './service'
import { Container } from 'inversify'
import { userModuleSymbols } from './symbol'

export const userModule = new Container()

userModule
  .bind(userModuleSymbols.getMockDAO)
  .toConstantValue(() => (__MOCK__ ? import('./mock').then((x) => x.userDAOMock) : Promise.resolve()))
userModule.bind(userModuleSymbols.userDAO).to(UserDAO).inSingletonScope()
userModule.bind(userModuleSymbols.userService).to(UserService).inTransientScope()
