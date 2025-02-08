import { assert } from '@/components/assert'
import type { Page } from '@/page'

export interface Menu {
  label: string
  data?: Page & {
    id: string
  }
  children?: Menu[]
}

export const generateMenusFromPages = (pages: Record<string, Page>): Menu[] => {
  const menus: Menu[] = []

  Object.entries(pages).forEach(([id, page]) => {
    const categories = page.category?.split('/') ?? []
    setMenu(menus, categories, id, page)
  })

  return menus
}

const setMenu = (menus: Menu[], categories: string[], id: string, data: Page) => {
  let parentMenu: Menu | undefined

  categories.forEach((category) => {
    if (parentMenu && !parentMenu.children) {
      parentMenu.children = []
    }
    const targetMenus = parentMenu ? parentMenu.children! : menus

    parentMenu = targetMenus.find((menu) => isCategory(menu) && menu.label === category)
    if (!parentMenu) {
      parentMenu = {
        label: category,
        children: []
      }
      targetMenus.push(parentMenu)
    }
  })

  assert(parentMenu)
  if (!parentMenu.children) {
    parentMenu.children = []
  }
  parentMenu.children.push({
    label: data.name,
    data: {
      ...data,
      id
    }
  })
}

const isCategory = (menu: Menu): boolean => !menu.data
