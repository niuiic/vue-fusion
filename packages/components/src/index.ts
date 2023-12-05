import type { App } from 'vue'
import { GIcon } from './components/gIcon'
import { GLayout } from './components/gLayout'

export default {
  install(app: App) {
    const components = [GIcon, GLayout]

    components.forEach((x) =>
      app.component(
        x
          .__name!.replace(/([A-Z])([A-Z])/g, '$1-$2')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase(),
        x
      )
    )
  }
}

export * from './components/gIcon'
export * from './components/gLayout'
