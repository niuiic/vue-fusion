import type { App, AppContext, Component, VNode, VNodeArrayChildren } from 'vue'
import { h, render } from 'vue'
import type { AnyObject } from './types'

type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

let globalAppContext: AppContext | null = null

export const asyncCompRenderer = (app: App) => {
  globalAppContext = app._context
}

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)

export const useAsyncComp = <T extends Component>(
  loadComponent: () => Promise<{ default: T }>,
  getContainer: () => HTMLElement | undefined | null = () => undefined
): [(props: ComponentProps<T>) => Promise<unknown>, () => Promise<unknown>] => {
  let container: HTMLElement | undefined | null
  let useTempContainer = false

  const mount = (props: ComponentProps<T>, children?: RawChildren) =>
    loadComponent().then((mod) => {
      const vNode = h(mod.default, props, children)
      vNode.appContext = globalAppContext

      container = getContainer()
      if (!container) {
        container = document.createElement('div')
        document.body.appendChild(container)
        useTempContainer = true
      }

      render(vNode, container)
    })

  const unmount = async () => {
    if (!container) {
      throw new Error('container does not exist')
    }

    render(null, container)

    if (useTempContainer) {
      document.body.removeChild(container)
    }
  }

  return [mount, unmount]
}
