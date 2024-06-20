import 'element-plus/dist/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.min.css'
// @ts-expect-error
import hljsDefineVue from 'highlightjs-vue'
import 'styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './utils/router'

hljsDefineVue(hljs)

createApp(App).use(router).mount('#app')
