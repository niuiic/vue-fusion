import 'element-plus/dist/index.css'
import 'styles/index.scss'
import { createApp } from 'vue'
import App from './app/App.vue'
import { asyncRenderer } from './components/useComponent'
import { router } from './router'

createApp(App).use(router).use(asyncRenderer).mount('#app')
