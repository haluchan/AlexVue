import Vue from "vue";
import uploader from "vue-simple-uploader";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/plugins/i18n";
import validator from "@/plugins/validator";

Vue.config.productionTip = false;
Vue.use(uploader);
Vue.use(validator);

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

export default app;
