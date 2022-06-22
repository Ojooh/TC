import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"
import './assets/css/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueCookies);
app.use(router);
// app.config.productionTip = false

app.mount('#app')
