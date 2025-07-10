import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.vue";
import naive from "naive-ui";
import piniaPersist from "pinia-plugin-persistedstate";
import "./styles/base.css";
import "./styles/variables.css";

createApp(App)
  .use(createPinia().use(piniaPersist))
  .use(router)
  .use(naive)
  .mount("#app");
