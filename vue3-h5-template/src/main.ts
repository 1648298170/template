import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import setupPlugins from '@/plugins/index'

createApp(App).use(setupPlugins).mount('#app')
