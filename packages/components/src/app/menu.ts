import type { Page } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

interface Menu {
  label: string
  data?: RouteRecordRaw
  children?: Menu[]
}

export const generateMenusFromRoutes = (routes: RouteRecordRaw[]): Menu[] => {
  const categorizedRoutes = categorizeRoutes(routes)

  const menus: Menu[] = []
  categorizedRoutes.forEach((routesInCategory, category) => {
    const childMenus = routesInCategory.map(
      (x): Menu => ({
        label: (x.meta?.page as Page).name,
        data: x
      })
    )

    menus.push({
      label: category,
      children: childMenus
    })
  })

  return menus
}

const categorizeRoutes = (routes: RouteRecordRaw[]): Map<string, RouteRecordRaw[]> => {
  const categorizedRoutes = new Map<string, RouteRecordRaw[]>()

  routes.forEach((route) => {
    const category = (route.meta?.page as Page)?.category ?? '未分类'

    if (!categorizedRoutes.has(category)) {
      categorizedRoutes.set(category, [])
    }
    categorizedRoutes.get(category)?.push(route)
  })

  return categorizedRoutes
}
