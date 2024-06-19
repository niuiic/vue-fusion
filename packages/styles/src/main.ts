import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(elementPlus).mount('#app')
