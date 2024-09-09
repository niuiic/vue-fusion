import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './app/App.vue'
import { asyncCompRenderer } from './components/useAsyncComp'
import { router } from './router'
import './styles/adaptation.scss'
import './styles/reset.scss'

createApp(App).use(router).use(asyncCompRenderer).mount('#app')
