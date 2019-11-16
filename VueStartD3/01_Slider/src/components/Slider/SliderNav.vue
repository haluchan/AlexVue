
<template>
  <div class="slider__nav">
    <div class="dot-group">
      <div
        class="dot"
        v-for="(item,index) in sliderList"
        :class="{active:index === current}"
        :key="item.id"
        @click="change(index)"
      >{{ index+1 }}</div>
    </div>
  </div>
</template>

<script>
let timer = null;
export default {
  name: "SliderNav",
  // 不用透過父傳子概念，可以跨層傳遞(共用資料)
  // provide inject 接收
  inject: ["sliderList"],
  props: {
    current: {
      required: true,
      type: Number
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    last() {
      return this.sliderList.length - 1;
    }
  },
  methods: {
    change(index) {
      let target = index < 0 ? this.last : index > this.last ? 0 : index;
      this.$emit("update:current", target);
      this.setTimer();
    },
    nextHandler() {
      this.change(this.current + 1);
    },
    setTimer() {
      this.clearTimer();
      if (this.auto) {
        timer = setTimeout(this.nextHandler, 3000);
      }
    },
    clearTimer() {
      clearTimeout(timer);
    }
  },
  watch: {
    //建議下面寫法，可以立即啟動
    // auto(newVal, oldVal){
    //   this.auto = oldVal
    // }
    auto: {
      immediate: true,
      handler(value) {
        value ? this.setTimer() : this.clearTimer();
      }
    }
  }
};
</script>

<style>
.dot-group {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
.dot {
  cursor: pointer;
  display: inline-block;
  width: 1%;
  padding-top: 1%;
  height: 0;
  overflow: hidden;
  margin: 1%;
  border-radius: 50%;
  background-color: #fff;
  text-indent: 100%;
  overflow: hidden;
  box-shadow: 0 0 5px #34495e;
}
.dot.active {
  background-color: #34495e;
}
</style>