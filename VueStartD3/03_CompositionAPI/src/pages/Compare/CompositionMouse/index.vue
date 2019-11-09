<template>
  <div>
    <h3>Composition</h3>
    x:{{x}},y:{{y}}
  </div>
</template>

<script>
import useMouse from "./composition";
export default {
  name: "CompositionMouse",
  setup() {
    let { x, y } = useMouse();
    return {
      x,
      y
    };
  }
};
</script>

<style>
</style>
