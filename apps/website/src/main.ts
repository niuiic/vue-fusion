import { registerMock, registerMode, registerPage, toRouteRecordRaws } from 'builtins'
import components from 'components'
import 'components/dist/css/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createPinia } from 'pinia'
import 'styles/dist/style.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './config/routes'

__MOCK__ && registerMock(import.meta.glob('./mock/**/*.ts'), './mock/')
registerMode(__MOCK__ ? 'mock' : 'other')
registerPage(import.meta.glob(['./view/pages/**/*.vue', '!**/components/**/*.vue']), './view/pages/')

const router = createRouter({
  history: createWebHashHistory(),
  routes: toRouteRecordRaws(routes)
})
const pinia = createPinia()

const app = createApp(App)
app
  .use(components)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(router)
  .use(pinia)
  .mount('#app')
