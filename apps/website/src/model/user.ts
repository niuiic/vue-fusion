import { useEntityFactory } from 'builtins'

export class User {
  public constructor(
    public id: string,
    public name = '用户名'
  ) {}
}

export const newUser = useEntityFactory(User)
