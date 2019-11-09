<template>
  <div class="slider" @mouseenter="focus = true" @mouseleave="focus = false">
    <SliderList :current="current"></SliderList>
    <SliderNav v-if="list.length >1" :current.sync="current" :auto="timerStatus"></SliderNav>
  </div>
</template>

<script>
import SliderList from "./SliderList";
import SliderNav from "./SliderNav";
export default {
  name: "Slider",
  props: {
    list: {
      required: true,
      type: Array
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: 0,
      focus: false
    };
  },
  computed: {
    timerStatus() {
      return this.auto && !this.focus;
    }
  },
  provide() {
    return {
      sliderList: this.list
    };
  },
  components: {
    SliderList,
    SliderNav
  }
};
</script>

<style>
.slider {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 35%;
  background-color: #34495e;
  overflow: hidden;
}
</style>