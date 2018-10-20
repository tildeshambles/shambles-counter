import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueSocketIO from "vue-socket.io";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueSocketIO, "http://localhost:9001", store);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
