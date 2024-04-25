export interface Route {
  name: string
  path: string
  redirect?: string
  meta: {
    label?: string
    icon?: string
  }
  page?: string
  children?: Route[]
}
