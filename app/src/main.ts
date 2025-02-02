import { asyncCompRenderer, registerMode, registerPage, toRouteRecordRaws } from 'components'
import 'components/dist/css/components.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './share/routes'
import './share/adaptation.scss'
import '@csstools/normalize.css'

registerMode({ DEV: __DEV__, MOCK: __MOCK__ })
registerPage(import.meta.glob(['./view/**/*.vue', '!**/components/**/*.vue']), './view/')

const router = createRouter({
  history: createWebHashHistory(),
  routes: toRouteRecordRaws(routes)
})
const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia).use(asyncCompRenderer)
if (__DEV__) {
  import('element-plus')
    .then((elementPlus) => {
      app.use(elementPlus.default).mount('#app')
    })
    .catch(() => {})
} else {
  app.mount('#app')
}
