import { registerMode } from 'business'
import components from 'components'
import 'components/dist/css/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { registerMock } from 'mock'
import { createPinia } from 'pinia'
import { createRouter, registerPage } from 'router'
import 'styles/dist/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { routes } from './config/router'

registerMock(import.meta.glob('./mock/**/*.ts'), './mock/')
registerMode(import.meta.env.MODE.includes('mock') ? 'mock' : 'other')
registerPage(import.meta.glob(['./view/pages/**/*.vue', '!**/components/**/*.vue']), './view/pages/')

const router = createRouter(routes)
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
