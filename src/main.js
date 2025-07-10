// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // <-- Impor konfigurasi router kita
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // <-- Beritahu aplikasi Vue untuk menggunakan router

app.mount("#app");
