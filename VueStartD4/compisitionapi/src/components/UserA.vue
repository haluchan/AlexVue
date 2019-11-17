<template>
  <div>
    <h1>{{ username }}</h1>
    <p>{{gender}}, {{age}}</p>
    <!-- <p>x:{{x}},y:{{y}}</p> -->
  </div>
</template>

<script>
import CompositionMouse from "../composition/MousePosition";
export default {
  name: "user-a",
  props: ["username", "gender", "age"],
  setup() {
    let { x, y } = CompositionMouse(10);
    return {
      x,
      y
    };
  }
};
</script>

<style>
</style>