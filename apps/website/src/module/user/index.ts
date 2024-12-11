import { UserDAO } from './dao'
import { UserService } from './service'
import { Container } from 'inversify'

export const userModule = new Container()

userModule.bind('getMockDAO').toConstantValue(() => import('./mock').then((x) => x.userDAOMock))
userModule.bind('UserDAO').to(UserDAO).inSingletonScope()
userModule.bind('UserService').to(UserService).inTransientScope()
