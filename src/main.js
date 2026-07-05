import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { init } from './helper/system.js';

import './style.css';

init()

createApp(App).use(router).mount('#app')
