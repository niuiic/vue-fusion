import { service, useAsyncFn } from 'components'
import type { User } from './model'

// ~ query
export type QueryUserReq = Pick<User, 'id'>
export type QueryUserRes = User
export const queryUserSvc = service<QueryUserReq, QueryUserRes>(
  undefined,
  useAsyncFn(() => import('./mock').then((x) => x.queryUserMock))
)

// ~ update
export type UpdateUserReq = User
export type UpdateUserRes = unknown
export const updateUserSvc = service<UpdateUserReq, UpdateUserRes>(
  undefined,
  useAsyncFn(() => import('./mock').then((x) => x.updateUserMock))
)
