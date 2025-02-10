import { useEntityFactory } from 'components'

export class UserEntity {
  constructor(
    public id: string,
    public name = '用户名'
  ) {}
}

export const newUser = useEntityFactory(UserEntity)
