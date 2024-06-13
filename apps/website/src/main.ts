import { registerMock, registerMode, registerPage, toRouteRecordRaws } from 'builtins'
import 'components/dist/css/style.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import 'styles/index.scss'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './config/routes'

__MOCK__ && registerMock(import.meta.glob('./mock/**/*.ts'), './mock/')
registerMode({ DEV: __DEV__, MOCK: __MOCK__ })
registerPage(import.meta.glob(['./view/pages/**/*.vue', '!**/components/**/*.vue']), './view/pages/')

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
