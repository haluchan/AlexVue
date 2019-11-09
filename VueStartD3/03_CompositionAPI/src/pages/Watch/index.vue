<template>
  <div>
    A:
    <input type="number" v-model.number="a" />
    B:
    <input type="number" v-model.number="b" />
    C:
    <input type="number" v-model.number="c" />
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { ref, watch } from "@vue/composition-api";
export default {
  name: "Watch",
  setup(props, context) {
    console.log(props, context);
    const a = ref(0);
    const b = ref(0);
    const c = ref(0);

    watch(a, (value, oldValue) => {
      console.log("a is change");
    });
    watch(b, (value, oldValue) => {
      console.log("b is change");
    });
    watch(c, (value, oldValue) => {
      console.log("c is change");
    });

    return {
      a,
      b,
      c
    };
  }
};
</script>

<style>
</style>