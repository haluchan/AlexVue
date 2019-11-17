<template>
  <div>
    <h3>Mixins</h3>
    <div>x:{{x}},y:{{y}}</div>
  </div>
</template>

<script>
import MousePosition from "../mixins/MousePosition";
export default {
  name: "check-position",
  mixins: [MousePosition()]
};
</script>

<style>
</style>