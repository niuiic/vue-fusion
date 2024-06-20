import 'element-plus/dist/index.css'
import 'highlight.js/styles/tokyo-night-dark.min.css'
import 'styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './utils/router'

createApp(App).use(router).mount('#app')
