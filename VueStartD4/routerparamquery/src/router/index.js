/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import Index from "@/pages/Index.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  // {
  //   path: "/a",
  //   name: "user",
  //   component: () => import(/* webpackChunkName: "user" */ "../pages/User.vue")
  //   // children:[
  //   //   {
  //   //     path:"b"
  //   //   }
  //   // ]
  // },
  {
    path: "/user/:uid",
    name: "user",
    meta: {
      checkUid: true
    },
    component: () => import(/* webpackChunkName: "user" */ "../pages/User.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.checkUid) {
    let user = await axios
      .get(`http://localhost:3000/user/${to.params.uid}`)
      .then(res => res.data)
      .catch(err => {
        store.commit("SET_USER", null);
        next("/");
      });
    store.commit("SET_USER", user);
    next();
  } else {
    next();
  }
});

export default router;
