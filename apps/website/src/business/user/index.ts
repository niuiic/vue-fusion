import { business, err } from 'builtins'
import type { User } from './model'

// # query
export type QueryUserReq = Pick<User, 'id'>
export type QueryUserRes = User
export const queryUserBiz = business<QueryUserReq, QueryUserRes>(
  async () => err<QueryUserRes>('接口暂未实现，请使用mock模式'),
  () => import('./mock').then((x) => x.queryUserMock)
)

// # update
export type UpdateUserReq = User
export type UpdateUserRes = undefined
export const updateUserBiz = business<UpdateUserReq, UpdateUserRes>(
  async () => err<UpdateUserRes>('接口暂未实现，请使用mock模式'),
  () => import('./mock').then((x) => x.updateUserMock)
)
