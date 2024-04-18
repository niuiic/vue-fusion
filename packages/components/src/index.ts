import type { App } from 'vue'
import './assets/icon.js'
import './assets/styles/index.scss'
import { GDialog } from './components/gDialog'
import { GIcon } from './components/gIcon'
import { GLayout } from './components/gLayout'
import { GNav } from './components/gNav'
import { GUser } from './components/gUser'
import { GWeather } from './components/gWeather'

export default {
  install(app: App) {
    const components = [GDialog, GIcon, GLayout, GNav, GUser, GWeather]

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

export * from './components/gDialog'
export * from './components/gIcon'
export * from './components/gLayout'
export * from './components/gNav'
export * from './components/gUser'
export * from './components/gWeather'
