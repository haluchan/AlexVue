<template>
  <ValidationProvider tag="div" :name="name" :rules="rules" v-slot="{ errors }">
    <h4>{{ text }}</h4>
    <input
      type="text"
      v-model="observeValue"
      :name="name"
      :placeholder="text"
    />
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
