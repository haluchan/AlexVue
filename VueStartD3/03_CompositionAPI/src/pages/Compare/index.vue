<template>
  <div>
    <input type="checkbox" v-model="status.mixin" />Mixin
    <input type="checkbox" v-model="status.hoc" />HOC
    <input type="checkbox" v-model="status.render" />RenderLess
    <input type="checkbox" v-model="status.composition" />Composition
    <MixinMouse v-if="status.mixin"></MixinMouse>
    <HOCMouse v-if="status.hoc"></HOCMouse>
    <RenderLessMouse v-if="status.render">
      <BaseComponent slot="component" slot-scope="props" :x="props.x" :y="props.y"></BaseComponent>
    </RenderLessMouse>
    <CompositionMouse v-if="status.composition"></CompositionMouse>
  </div>
</template>

<script>
import BaseComponent from "./BaseComponent";
import MixinMouse from "./MixinMouse";
import HOCMouse from "./HOCMouse";
import RenderLessMouse from "./RenderLessMouse";
import CompositionMouse from "./CompositionMouse";

export default {
  name: "Compare",
  data() {
    return {
      status: {
        mixin: true,
        hoc: true,
        render: true,
        composition: true
      }
    };
  },
  components: {
    BaseComponent,
    MixinMouse,
    HOCMouse,
    RenderLessMouse,
    CompositionMouse
  }
};
</script>

<style>
</style>