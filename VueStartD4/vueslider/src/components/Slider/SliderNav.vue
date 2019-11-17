<template>
  <div>
    <div class="dot-group">
      <div
        class="dot"
        v-for="num in total"
        :key="num"
        :class="{ active: current === num - 1 }"
        @click="change(num - 1)"
      >
        {{ num }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "slider-nav",
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(index) {
      // this.$emit("change", index);
      this.$emit("update:current", index);
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
  box-shadow: 0 0 5px white;
}
</style>
