import type { QueryUserReq, QueryUserRes, UpdateUserReq, UpdateUserRes } from '@/business/def/user'
import { business, err } from 'builtins'

export const queryUserBiz = business<QueryUserReq, QueryUserRes>(
  async () => err<QueryUserRes>('接口暂未实现，请使用mock模式'),
  () => import('@/mock/user').then((x) => x.queryUserMock)
)

export const updateUserBiz = business<UpdateUserReq, UpdateUserRes>(
  async () => err<UpdateUserRes>('接口暂未实现，请使用mock模式'),
  () => import('@/mock/user').then((x) => x.updateUserMock)
)
