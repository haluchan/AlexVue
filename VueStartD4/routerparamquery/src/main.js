/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// bind, inserted, update, componentUpdate, unbind
Vue.directive("content", {
  bind(el, binding, vnode) {
    console.log(el, binding, vnode);
  },
  inserted(el, { value }) {
    el.innerText = value;
  },
  update(el, { value }) {
    el.innerText = value;
  }
});
Vue.directive("focus", {
  inserted(el, { value }) {
    if (value) el.focus();
  },
  update(el, { value }) {
    if (value) el.focus();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
