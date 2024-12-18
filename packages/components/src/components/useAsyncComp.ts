import type { App, AppContext, Component, VNode, VNodeArrayChildren } from 'vue'
import { h, render } from 'vue'
import type { AnyObject } from './types'

type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

let globalAppContext: AppContext | null = null

export const asyncCompRenderer = (app: App) => {
  globalAppContext = app._context
}

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any)

type GetProps<T> = ({
  unmount,
  getVNode,
  update
}: {
  unmount: () => Promise<unknown>
  getVNode: () => VNode
  update: MountFn<T>
}) => ComponentProps<T>
type GetChildren<T> = ({
  unmount,
  getVNode,
  update
}: {
  unmount: () => Promise<unknown>
  getVNode: () => VNode
  update: MountFn<T>
}) => RawChildren
type MountFn<T> = (getProps: GetProps<T>, getChildren?: GetChildren<T>) => Promise<void>

export const useAsyncComp = <T extends Component>(
  loadComponent: () => Promise<{ default: T }>,
  getContainer: () => HTMLElement | undefined | null = () => undefined
) => {
  const mount: MountFn<T> = async (getProps: GetProps<T>, getChildren?: GetChildren<T>) => {
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
      getChildren,
      update
    }: { component: T; getProps: GetProps<T>; getChildren?: GetChildren<T>; update: MountFn<T> }) => {
      vnode = h(
        component,
        getProps({ unmount, getVNode, update }),
        getChildren ? getChildren({ unmount, getVNode, update }) : undefined
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

    const update = (getProps: GetProps<T>, getChildren?: GetChildren<T>) =>
      loadComponent().then((mod) => renderComponent({ component: mod.default, getProps, getChildren, update }))

    return update(getProps, getChildren)
  }

  return mount
}
