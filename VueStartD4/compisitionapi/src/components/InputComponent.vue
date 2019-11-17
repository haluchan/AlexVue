<template>
  <div>
    <h3>{{title}}</h3>
    <input type="text" v-model="bindingValue" />
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  computed: {
    bindingValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      }
    }
  }
};
</script>

<style>
</style>