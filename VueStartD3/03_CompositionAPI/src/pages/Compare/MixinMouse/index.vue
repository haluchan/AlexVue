<template>
  <div>
    <h3>Mixin</h3>
    x:{{x}},y:{{y}}
  </div>
</template>

<script>
import useMouse from "./mixin";
export default {
  name: "MixinMouse",
  mixins: [useMouse]
};
</script>

<style>
</style>
