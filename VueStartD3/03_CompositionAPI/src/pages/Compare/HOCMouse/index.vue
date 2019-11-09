<template>
  <div>
    <h3>HOC</h3>
    <BaseComponent :x="x" :y="y"></BaseComponent>
  </div>
</template>

<script>
/* eslint-disable no-console */
import BaseComponent from "../BaseComponent";

function userMouse(BaseComponent) {
  return {
    name: "HOCMouse",
    data() {
      return {
        x: 0,
        y: 0
      };
    },
    methods: {
      moveHandler(e) {
        console.log("hoc-move");
        this.x = e.pageX;
        this.y = e.pageY;
      }
    },
    mounted() {
      window.addEventListener("mousemove", this.moveHandler);
    },
    beforeDestroy() {
      window.removeEventListener("mousemove", this.moveHandler);
    },
    components: {
      BaseComponent
    }
  };
}

export default userMouse(BaseComponent);
</script>

<style>
</style>
