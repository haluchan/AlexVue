<template>
  <div class="slider__view" :style="styleObj"></div>
</template>

<script>
export default {
  name: "slider-view",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    styleObj() {
      return {
        backgroundImage: `url("${this.src}")`
      };
    }
  }
};
</script>

<style>
.slider__view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
</style>
