import Vue from "vue";
import VueRouter from "vue-router";
import Hello from "../pages/Hello";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "hello",
    component: Hello
  },
  {
    path: "/compare",
    name: "compare",
    component: () =>
      import(/* webpackChunkName: "compare" */ "../pages/Compare")
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import(/* webpackChunkName: "todo" */ "../pages/Todo")
  },
  {
    path: "/watch",
    name: "watch",
    component: () => import(/* webpackChunkName: "watch" */ "../pages/Watch")
  }
];

const router = new VueRouter({
  routes
});

export default router;
