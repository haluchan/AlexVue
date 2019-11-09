<template>
  <div>x:{{x}},y:{{y}}</div>
</template>

<script>
export default {
  name: "BaseComponent",
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style>
</style>