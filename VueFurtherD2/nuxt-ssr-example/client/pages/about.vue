<template>
  <div>
    <h1>About</h1>
    <p>{{ $store.state.message }}</p>
    <template v-if="$store.state.Counter">
      <div v-if="$store.state.Counter.isLoading">
        <h2>Loading...</h2>
      </div>
      <div v-else>
        <h2>{{ count }}</h2>
        <p>
          <button @click="count--">-</button>
          <button @click="count++">+</button>
        </p>
        <p>
          <button @click="getCount">Get Count</button>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Counter from "../storeModules/Counter";
export default {
  async asyncData({ store }) {
    // store.registerModule("Counter", Counter);
    // store.commit("Counter/SET_LOADING", false);
    // let count = await store.dispatch("Counter/GET_COUNT");
    // return {
    //   asyncCount: count
    // };
  },
  async fetch({ app, store }) {
    app.$registerModule(store, { Counter });
    await store.dispatch("Counter/GET_COUNT");
  },
  async beforeCreate() {
    this.$registerModule(this.$store, { Counter });
  },
  beforeDestroy() {
    this.$unregisterModule(this.$store, ["Counter"]);
  },
  data() {
    return {
      title: "About"
    };
  },
  computed: {
    count: {
      ...mapState("Counter", { get: "count" }),
      ...mapMutations("Counter", { set: "SET_COUNT" })
    }
  },
  methods: {
    ...mapActions("Counter", { getCount: "GET_COUNT" })
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<style></style>
