import { UserDAO } from './dao'
import { UserService } from './service'
import { Container } from 'inversify'
import { userModuleSymbols } from './symbol'

export const userModule = new Container()

userModule.bind(userModuleSymbols.getMockDAO).toConstantValue(() => import('./mock').then((x) => x.userDAOMock))
userModule.bind(userModuleSymbols.userDAO).to(UserDAO).inSingletonScope()
userModule.bind(userModuleSymbols.userService).to(UserService).inTransientScope()
