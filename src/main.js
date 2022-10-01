import { createApp } from "vue";
import App from "./App.vue";
import { Router } from "./router";
import PrimeVue from "primevue/config";
import { Vue3Mq } from "vue3-mq";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { AuthServiceKey, JobsServiceKey } from "./core/utils/keys";
import { AuthService } from "./accounts/services/auth.service";
import "@/assets/base.css";
import { JobsService } from "./jobs/services/jobs.service";
import Timeline from "primevue/timeline";

const app = createApp(App);

app.use(Router);
app.use(PrimeVue);
app.use(Vue3Mq, { preset: "tailwind" });
app.use(ConfirmationService);
app.use(ToastService);
app.component("PvTimeline", Timeline);

app.provide(AuthServiceKey, new AuthService());
app.provide(JobsServiceKey, new JobsService());

app.mount("#app");
