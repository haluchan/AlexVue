<template>
  <!-- <div class="slider__list"> -->
  <!-- <transition name="fade">
      <img :src="nowPic.src" :key="nowPic.id" />
    </transition> -->
  <transition-group name="fade" tag="div" class="slider__list">
    <SliderView
      v-for="(item, index) in sliderList"
      :key="item.id"
      v-show="current === index"
      :src="item.src"
    ></SliderView>
  </transition-group>
  <!-- </div> -->
</template>

<script>
import SliderView from "./SliderView";
export default {
  name: "slider-list",
  inject: ["sliderList"],
  props: {
    current: {
      type: Number,
      required: true
    }
    //   nowPic: {
    //     type: Object,
    //     required: true
    //   }
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
