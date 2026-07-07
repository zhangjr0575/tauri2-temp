import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import directives from './plugins/directives'

import { init } from './helper/system.js'

import './style.css'

init()

const app = createApp(App)

app.config.globalProperties.$t = i18n.global.t

app.use(router).use(i18n).use(directives).mount('#app')
