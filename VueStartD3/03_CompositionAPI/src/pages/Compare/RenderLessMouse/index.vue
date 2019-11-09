<template>
  <div>
    <h3>RenderLess</h3>
    <slot name="component" :x="x" :y="y"></slot>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "RenderLessMouse",
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  methods: {
    moveHandler(e) {
      console.log("render-less-move");
      this.x = e.pageX;
      this.y = e.pageY;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.moveHandler);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.moveHandler);
  }
};
</script>

<style>
</style>