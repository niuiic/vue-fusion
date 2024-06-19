import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'highlight.js/styles/tokyo-night-dark.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'

createApp(App).use(elementPlus).mount('#app')
