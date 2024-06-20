import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
// @ts-expect-error
import hljsDefineVue from 'highlightjs-vue'

hljsDefineVue(hljs)

createApp(App).use(elementPlus).mount('#app')
