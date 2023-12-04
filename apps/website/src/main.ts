import components from 'components'
import 'components/dist/css/style.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(components).mount('#app')
