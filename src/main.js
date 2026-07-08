import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import setup from './plugins/setup'
import packages from './plugins/packages'
import directives from './plugins/directives'

const app = createApp(App)


app.use(router).use(i18n).use(setup).use(packages).use(directives).mount('#app')
