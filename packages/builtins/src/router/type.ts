export interface Route {
  name: string
  path: string
  redirect?: string
  meta: {
    label?: string
    icon?: string
    navLevel?: number
  }
  page?: string
  children?: Route[]
}
