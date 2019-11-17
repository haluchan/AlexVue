<template>
  <div>
    <h3>HOC</h3>
    <cp :x="x" :y="y"></cp>
  </div>
</template>

<script>
import MousePosition from "./MousePosition";
function HOC(cp) {
  return {
    name: `hoc-${cp.name}`,
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
    },
    components: {
      cp
    }
  };
}

export default HOC(MousePosition);
</script>

<style>
</style>