import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/i18n",
    name: "i18n",
    component: () => import(/* webpackChunkName: "i18n" */ "../views/I18n.vue")
  },
  {
    path: "/vee-validate",
    name: "vee-validate",
    component: () =>
      import(/* webpackChunkName: "vee-validate" */ "../views/VeeValidate.vue")
  },
  {
    path: "/vue-simple-uploader",
    name: "vue-simple-uploader",
    component: () =>
      import(
        /* webpackChunkName: "vue-simple-uploader" */ "../views/VueSimpleUploader.vue"
      )
  },
  {
    path: "/vue-owl-carousel",
    name: "vue-owl-carousel",
    component: () =>
      import(
        /* webpackChunkName: "vue-owl-carousel" */ "../views/VueOwlCarousel.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
