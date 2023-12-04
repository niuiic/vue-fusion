import type { App } from 'vue'
import { GIcon } from './components/gIcon'

export default {
  install(app: App) {
    const components = [GIcon]

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
