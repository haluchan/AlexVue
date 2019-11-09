<template>
  <div class="light-vue__modal-backdrop" @click="$root.$emit('close')"></div>
</template>

<script>
export default {
  name: "ModalBackdrop"
};
</script>

<style lang="scss">
.light-vue {
  &__modal-backdrop {
    position: fixed;
    background-color: rgba(#34495e, 0.8);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
}
</style>