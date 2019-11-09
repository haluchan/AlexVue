<template>
  <div class="light-vue" v-if="view">
    <ModalBackdrop></ModalBackdrop>
    <ModalView :view="view"></ModalView>
  </div>
</template>

<script>
import ModalBackdrop from "./ModalBackdrop";
import ModalView from "./ModalView";
export default {
  name: "LightVue",
  props: ["current", "list"],
  computed: {
    view() {
      return this.list[this.current] || null;
    }
  },
  components: {
    ModalBackdrop,
    ModalView
  }
};
</script>

<style lang="scss">
.lv {
  cursor: pointer;
}
.light-vue {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  outline: 0;
  overflow: hidden;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    box-sizing: border-box;
  }
}
</style>