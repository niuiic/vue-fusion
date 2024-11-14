import type { QueryUserReq, QueryUserRes, UpdateUserReq, UpdateUserRes } from './index'
import { newUser } from './model'

// % data %
const users = [newUser({ name: '用户1' }), newUser({ name: '用户2' })]

// % query %
export const queryUserMock = async (args: QueryUserReq): Promise<QueryUserRes> => {
  const user = users.find((x) => x.id === args.id)
  if (!user) {
    throw new Error('没有该用户')
  }

  return user
}

// % update %
export const updateUserMock = async (args: UpdateUserReq): Promise<UpdateUserRes> => {
  const user = users.find((x) => x.id === args.id)
  if (!user) {
    throw new Error('没有该用户')
  }

  user.name = args.name
  return
}
