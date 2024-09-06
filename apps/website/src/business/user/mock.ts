import { err, mock, ok } from 'builtins'
import type { QueryUserReq, QueryUserRes, UpdateUserReq, UpdateUserRes } from './index'
import { newUser } from './model'

// ~ data
const users = [newUser({ name: '用户1' }), newUser({ name: '用户2' })]

// ~ query
export const queryUserMock = mock<QueryUserReq, QueryUserRes>(async (args) => {
  const user = users.find((x) => x.id === args.id)
  if (!user) {
    return err('没有该用户')
  }

  return ok(user)
})

// ~ update
export const updateUserMock = mock<UpdateUserReq, UpdateUserRes>(async (args) => {
  const user = users.find((x) => x.id === args.id)
  if (!user) {
    return err('没有该用户')
  }

  user.name = args.name
  return ok()
})
