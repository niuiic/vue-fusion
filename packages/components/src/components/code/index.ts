import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.min.css'
import Code from './Code.vue'
import { hljsDefineVue } from './highlightVue'

hljs.registerLanguage('vue', hljsDefineVue)

export type * from './nonBusiness'
export { Code }
