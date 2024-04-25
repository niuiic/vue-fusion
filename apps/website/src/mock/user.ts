import type { QueryUserReq, QueryUserRes, UpdateUserReq, UpdateUserRes } from '@/business/def/user'
import { newUser } from '@/model/user'
import { mock } from 'builtins'
import { err, ok } from 'fx-flow'

const users = [newUser({ name: '用户1' }), newUser({ name: '用户2' })]

export const queryUserMock = mock<QueryUserReq, QueryUserRes>(async (args) => {
  const user = users.find((x) => x.id === args.id)
  if (!user) {
    return err('没有该用户')
  }

  return ok(user)
})

export const updateUserMock = mock<UpdateUserReq, UpdateUserRes>(async (args) => {
  const user = users.find((x) => x.id === args.id)
  if (!user) {
    return err('没有该用户')
  }

  user.name = args.name
  return ok()
})
