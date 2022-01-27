import { createApp } from 'vue'

import "./styles/index.scss"

import App from '@/App.vue'
import router from '@/services/router'

const app = createApp(App)
app.use(router);
app.mount('#app')
