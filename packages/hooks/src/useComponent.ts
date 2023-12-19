import { localUniqId } from 'utils'
import type { App, Component } from 'vue'
import { createApp } from 'vue'

export const useComponent = <T extends Component>(args: {
  component: T
  mountPoint: Element
  extendApp?: (app: App) => void
}) => {
  let container: Element | undefined
  let app: App | undefined
  const id = 'component' + localUniqId()

  const destroy = () => {
    if (!container || !app) {
      return
    }

    app.unmount()
    args.mountPoint.removeChild(container)
    container = undefined
    app = undefined
  }

  const render = (props: ComponentProps<T>) => {
    app = createApp(args.component, props)
    args.extendApp && args.extendApp(app)
    container = document.createElement('div')
    container.setAttribute('id', id)
    args.mountPoint.appendChild(container)
    app.mount(`#${id}`)
  }

  return { render, destroy }
}
