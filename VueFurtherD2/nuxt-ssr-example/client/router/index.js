import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/index.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/about.vue").then(
        m => m.default
      )
  },
  {
    path: "/users",
    children: [
      {
        path: "",
        name: "users",
        component: () =>
          import(
            /* webpackChunkName: "users_index" */ "../pages/users/index.vue"
          ).then(m => m.default)
      },
      {
        path: ":uid",
        component: () =>
          import(
            /* webpackChunkName: "users_uid" */ "../pages/users/_uid.vue"
          ).then(m => m.default)
      }
    ],
    component: () =>
      import(/* webpackChunkName: "users" */ "../pages/users.vue").then(
        m => m.default
      )
  },
  {
    path: "*",
    redirect: "/"
  }
];

export function createRouter() {
  return new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savePosition) {
      if (savePosition) {
        return savePosition;
      } else if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    }
  });
}
