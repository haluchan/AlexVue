<template>
  <div class="slider__view" :style="{backgroundImage:`url('${src}')`}"></div>
</template>

<script>
export default {
  name: "SliderView",
  props: {
    src: {
      required: true,
      type: String
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