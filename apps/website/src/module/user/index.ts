import { createInjector, Scope } from 'typed-inject'
import { UserDAO } from './dao'
import { UserService } from './service'

export const userModule = createInjector()
  .provideValue('getMockDAO', () => import('./mock').then((x) => x.userDAOMock))
  .provideClass('UserDAO', UserDAO)
  .provideClass('UserService', UserService, Scope.Transient)
