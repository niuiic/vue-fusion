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
) => {
  type GetProps = ({
    unmount,
    getVNode
  }: { unmount: () => Promise<unknown>; getVNode: () => VNode }) => ComponentProps<T>
  type GetChildren = ({ unmount, getVNode }: { unmount: () => Promise<unknown>; getVNode: () => VNode }) => RawChildren

  const mount = async (getProps: GetProps, getChildren?: GetChildren) => {
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

    const renderComponent = ({
      component,
      getProps,
      getChildren
    }: { component: T; getProps: GetProps; getChildren?: GetChildren }) => {
      vnode = h(
        component,
        getProps({ unmount, getVNode }),
        getChildren ? getChildren({ unmount, getVNode }) : undefined
      )
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

    const update = (getProps: GetProps, getChildren?: GetChildren) =>
      loadComponent()
        .then((mod) => renderComponent({ component: mod.default, getProps, getChildren }))
        .then(() => update)

    return update(getProps, getChildren)
  }

  return mount
}
