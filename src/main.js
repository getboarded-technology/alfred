import Vue from "vue";
import { ToastPlugin, ModalPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";

import router from "./router";
import store from "./store";
import App from "./App.vue";

// Global Components
import "./global-components";

// 3rd party plugins
import "@/libs/portal-vue";
import "@/libs/toastification";

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

// i18n
import i18n from "./i18n/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
