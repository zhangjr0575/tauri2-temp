import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const stored = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (stored ? stored === 'dark' : prefersDark) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

createApp(App).use(router).mount('#app')
