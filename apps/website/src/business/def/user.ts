import type { User } from '@/model/user'

export type QueryUserReq = Pick<User, 'id'>
export type QueryUserRes = User

export type UpdateUserReq = User
export type UpdateUserRes = undefined
