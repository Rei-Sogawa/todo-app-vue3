import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@/plugins/font-awesome";

import "bootstrap/dist/css/bootstrap.css";

createApp(App)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
