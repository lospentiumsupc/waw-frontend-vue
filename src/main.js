import { createApp } from "vue";
import App from "./App.vue";
import { Router } from "./router";
import PrimeVue from "primevue/config";
import { Vue3Mq } from "vue3-mq";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { AuthServiceKey } from "./core/utils/keys";
import { AuthService } from "./accounts/services/auth.service";
import "@/assets/base.css";

const app = createApp(App);

app.use(Router);
app.use(PrimeVue);
app.use(Vue3Mq, { preset: "tailwind" });
app.use(ConfirmationService);
app.use(ToastService);

app.provide(AuthServiceKey, new AuthService());

app.mount("#app");
