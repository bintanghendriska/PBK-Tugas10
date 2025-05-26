// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <-- Impor konfigurasi router kita

const app = createApp(App)

app.use(router) // <-- Beritahu aplikasi Vue untuk menggunakan router

app.mount('#app')