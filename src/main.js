import { createApp } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router';
import App from "./App.vue";
import { createPinia } from "pinia";
import axios from "axios";
import "./assets/main.css";

axios.defaults.baseURL = "http://localhost:3000/";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
app.use(createPinia());
app.use(router);
app.mount("#app");
