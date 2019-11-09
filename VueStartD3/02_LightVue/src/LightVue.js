import Vue from "vue";
import LightVue from "./components/LightVue";

Vue.config.productionTip = false;

let target = null;
let data = {
  current: 0,
  list: []
};
let el = null;
let vm = null;
const init = function() {
  if (target) removeEvent();
  target = Array.from(document.querySelectorAll(".lv"));
  data.current = 0;
  data.list = target.map((item, index) => {
    return {
      index,
      src: item.src
    };
  });
  vm = new Vue({
    data,
    methods: {
      changeHandler(index) {
        this.current =
          index < 0
            ? 0
            : index > this.list.length - 1
            ? this.list.length - 1
            : index;
      },
      prevHandler() {
        this.changeHandler(this.current - 1);
      },
      nextHandler() {
        this.changeHandler(this.current + 1);
      }
    },
    mounted() {
      this.$on("prev", this.prevHandler);
      this.$on("next", this.nextHandler);
      this.$on("close", close);
    },
    beforeDestroyed() {
      this.$off("prev", this.prevHandler);
      this.$off("next", this.nextHandler);
      this.$off("close", close);
    },
    render: h =>
      h(LightVue, {
        props: { current: data.current, list: data.list }
      })
  }).$mount();
  addEvent();
};

const open = function() {
  close();
  el = document.createElement("div");
  el.appendChild(vm.$el);
  data.current = target.indexOf(this);
  document.body.appendChild(el);
};
const close = function() {
  if (!el) return false;
  document.body.removeChild(el);
  el = null;
};

const addEvent = function() {
  target.forEach(item => item.addEventListener("click", open));
};
const removeEvent = function() {
  target.forEach(item => item.removeEventListener("click", open));
};

export default Object.defineProperties(
  {},
  {
    init: {
      value: init
    }
  }
);
