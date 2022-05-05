import { createApp } from "vue";
import App from "./App.vue";
import { Router } from "./router";
import PrimeVue from "primevue/config";
import { Vue3Mq } from "vue3-mq";
import "@/assets/base.css";

const app = createApp(App);

app.use(Router);
app.use(PrimeVue);
app.use(Vue3Mq, { preset: "tailwind" });

app.mount("#app");
