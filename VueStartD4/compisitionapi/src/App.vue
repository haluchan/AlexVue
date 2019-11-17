<template src="./template.html"></template>

<script>
/* eslint-disable */
import User from "./components/User";
import UserA from "./components/UserA";
import UserB from "./components/UserB";
import InputComponent from "./components/InputComponent";
import CheckComponent from "./components/CheckboxComponent";
import HOC from "./components/HOC";
import RenderLess from "./components/RenderLess";
import MousePosition from "./components/MousePosition";
import Mixin from "./components/CheckPosition";
import CompositionMouse from "./composition/MousePosition";
export default {
  name: "app",
  setup() {
    let { x, y } = CompositionMouse(0);
    return { myX: x, myY: y };
  },
  data() {
    return {
      type: "UserA",
      users: [
        { username: "Alex", gender: "Male", age: 36 },
        { username: "Sara", gender: "Female", age: 18 }
      ],
      form: [
        { type: "InputComponent", value: "", title: "名稱" },
        { type: "CheckComponent", value: false, title: "是否訂閱電子報" }
      ]
    };
  },
  components: {
    User,
    UserA,
    UserB,
    Mixin,
    HOC,
    RenderLess,
    MousePosition,
    InputComponent,
    CheckComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
