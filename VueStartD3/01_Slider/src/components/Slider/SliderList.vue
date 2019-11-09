<template>
  <div class="slider__list">
    <transition-group name="fade" appear>
      <SliderView
        v-for="(item,index) in sliderList"
        :key="item.id"
        :src="item.src"
        v-show="index === current"
      ></SliderView>
    </transition-group>
  </div>
</template>

<script>
import SliderView from "./SliderView";

export default {
  name: "SlideList",
  inject: ["sliderList"],
  props: {
    current: {
      required: true,
      type: Number
    }
  },
  components: {
    SliderView
  }
};
</script>

<style>
.slider__list {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>