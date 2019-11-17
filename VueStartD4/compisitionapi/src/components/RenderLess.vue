<template>
  <div>
    <h3>RenderLess</h3>
    <slot name="component" :x="x" :y="y"></slot>
  </div>
</template>

<script>
export default {
  name: "render-less",
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  methods: {
    mousemoveHandler(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.mousemoveHandler);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.mousemoveHandler);
  }
};
</script>

<style>
</style>