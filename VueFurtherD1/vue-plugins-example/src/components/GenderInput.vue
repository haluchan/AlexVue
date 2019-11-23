<template>
  <ValidationProvider
    tag="div"
    :name="name"
    rules="required"
    v-slot="{ errors }"
  >
    <h4>{{ text }}</h4>
    <input type="radio" v-model="observeValue" :name="name" value="0" />女
    <input type="radio" v-model="observeValue" :name="name" value="1" />男
    <input type="radio" v-model="observeValue" :name="name" value="2" />其他
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: "TextInput",
  props: ["value", "name", "rules", "text"],
  computed: {
    observeValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
