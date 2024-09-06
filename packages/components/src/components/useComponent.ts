import type { App, AppContext, Component } from 'vue'
import { h, render } from 'vue'
import type { AnyObject } from './types'

type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

let globalAppContext: AppContext | null = null

export const asyncRenderer = (app: App) => {
  globalAppContext = app._context
}

export const useComponent = <T extends Component>(
  loadComponent: () => Promise<{ default: T }>,
  getContainer: () => HTMLElement | undefined | null = () => document.body
): [(props: ComponentProps<T>) => Promise<unknown>, () => Promise<unknown>] => {
  const mount = (props: ComponentProps<T>) =>
    loadComponent().then((mod) => {
      const vNode = h(mod.default, props)
      vNode.appContext = globalAppContext

      const container = getContainer()
      if (!container) {
        throw new Error('container does not exist')
      }

      render(vNode, container)
    })

  const unmount = async () => {
    const container = getContainer()
    if (!container) {
      throw new Error('container does not exist')
    }

    render(null, container)
  }

  return [mount, unmount]
}
