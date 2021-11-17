import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/feather-font.css";
import "./assets/css/vazir-font.css";
import './tailwind.css'
import naive from 'naive-ui'
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
.use(store)
.use(Toast, {containerClassName: "Vue-Toastification__toast--rtl"})
.use(router)
.use(naive)
.mount('#app')
