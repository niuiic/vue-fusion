import { registerMock, registerModes, registerPage, toRouteRecordRaws } from 'builtins'
import 'components/dist/css/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createPinia } from 'pinia'
import 'styles/index.scss'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './config/routes'

__MOCK__ && registerMock(import.meta.glob('./mock/**/*.ts'), './mock/')
registerModes({ DEV: import.meta.env.MODE.includes('dev'), MOCK: __MOCK__ })
registerPage(import.meta.glob(['./view/pages/**/*.vue', '!**/components/**/*.vue']), './view/pages/')

const router = createRouter({
  history: createWebHashHistory(),
  routes: toRouteRecordRaws(routes)
})
const pinia = createPinia()

const app = createApp(App)
app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(router)
  .use(pinia)
  .mount('#app')
