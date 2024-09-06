import { registerMode, registerPage, toRouteRecordRaws } from 'components'
import 'components/dist/css/style.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './share/routes'

registerMode({ DEV: __DEV__, MOCK: __MOCK__ })
registerPage(import.meta.glob(['./view/**/*.vue', '!**/components/**/*.vue']), './view/')

const router = createRouter({
  history: createWebHashHistory(),
  routes: toRouteRecordRaws(routes)
})
const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia)
if (__DEV__) {
  import('element-plus').then((elementPlus) => {
    app.use(elementPlus.default).mount('#app')
  })
} else {
  app.mount('#app')
}
