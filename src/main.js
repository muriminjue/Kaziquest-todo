import * as Vue from "vue";
import BootstrapVue3 from "bootstrap-vue-3";

// import styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "./assets/styles/index.scss";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.createApp(App).use(router).use(BootstrapVue3).mount("#app");
