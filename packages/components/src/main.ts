import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './app/App.vue'
import { asyncRenderer } from './components/useComponent'
import { router } from './router'
import './styles/adaptation.scss'
import './styles/reset.scss'

createApp(App).use(router).use(asyncRenderer).mount('#app')
