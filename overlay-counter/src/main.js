import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(VueSocketIO, "http://localhost:9001", store);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
