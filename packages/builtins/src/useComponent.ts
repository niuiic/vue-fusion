import type { Component } from 'vue'
import { getCurrentInstance, h, render } from 'vue'
import type { AnyObject } from './types'

type ComponentProps<T> = T extends abstract new (...args: any[]) => any ? InstanceType<T>['$props'] : AnyObject

export const useComponent = <T extends Component>(
  component: () => Promise<{ default: T }>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  container: () => HTMLElement | undefined | null = () => document.body
): [(props: ComponentProps<T>) => Promise<boolean>, () => boolean] => {
  let mounted = false
  const globalAppContext = getCurrentInstance()?.appContext ?? null

  const mount = (props: ComponentProps<T>): Promise<boolean> =>
    component()
      .then((mod) => {
        if (mounted) {
          return false
        }

        const vNode = h(mod.default, props)
        vNode.appContext = globalAppContext

        const el = container()
        if (!el) {
          return false
        }

        render(vNode, el)
        mounted = true
        return true
      })
      .catch(() => false)

  const unmount = () => {
    if (!mounted) {
      return false
    }

    const el = container()
    if (!el) {
      return false
    }

    render(null, el)
    mounted = false
    return true
  }

  return [mount, unmount]
}
