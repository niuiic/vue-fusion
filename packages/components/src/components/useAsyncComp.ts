import type { App, AppContext, Component, VNode, VNodeArrayChildren } from 'vue'
import { computed, h, render } from 'vue'
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
) => {
  const mount = async ({
    getProps,
    getChildren,
    enableUpdate
  }: {
    getProps: (unmount: () => Promise<unknown>, getVNode: () => VNode) => ComponentProps<T>
    getChildren?: (unmount: () => Promise<unknown>, getVNode: () => VNode) => RawChildren
    enableUpdate?: boolean
  }) => {
    let container: HTMLElement | undefined | null
    let useTempContainer = false
    let vnode: VNode | undefined

    const unmount = async () => {
      if (!container) {
        throw new Error('container does not exist')
      }

      render(null, container)

      if (useTempContainer) {
        document.body.removeChild(container)
        container = undefined
        useTempContainer = false
        vnode = undefined
      }
    }

    const getVNode = (): VNode => {
      if (!vnode) {
        throw new Error('component is not mounted')
      }
      return vnode
    }

    const renderComponent = (component: T) => {
      vnode = h(component, getProps(unmount, getVNode), getChildren ? getChildren(unmount, getVNode) : undefined)
      vnode.appContext = globalAppContext

      if (!container) {
        container = getContainer()
      }
      if (!container) {
        container = document.createElement('div')
        document.body.appendChild(container)
        useTempContainer = true
      }

      render(vnode, container)
    }

    return loadComponent().then((mod) => {
      if (enableUpdate) {
        computed(() => renderComponent(mod.default))
      } else {
        renderComponent(mod.default)
      }
    })
  }

  return mount
}
