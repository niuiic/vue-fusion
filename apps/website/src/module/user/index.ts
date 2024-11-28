import { createInjector } from 'typed-inject'
import { UserService } from './service'

export const userModule = createInjector()
  .provideValue('getMockService', () => import('./mock').then((x) => x.userServiceMock))
  .provideClass('UserService', UserService)
