<template>
  <div>
    <p>Query ID : {{ id }}</p>
    <p>
      <input type="text" v-model="query" v-focus />
      <input v-for="num in 3" :key="num" type="text" v-focus="step === num" />
      <button @click="changeQuery">送出</button>
    </p>
    <p>
      <button @click="step = 1">Step 1</button>
      <button @click="step = 2">Step 2</button>
      <button @click="step = 3">Step 3</button>
    </p>
    <p v-content="query"></p>
    <p>
      <router-link :to="{ query: { id: 'alex' } }">Query Alex</router-link>
    </p>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "index-component",
  data() {
    return {
      step: 1,
      qid: this.id
    };
  },
  computed: {
    id() {
      console.log("computed:", this.$route.query.id);
      return this.$route.query.id || "none";
    },
    query: {
      get() {
        return this.qid;
      },
      set(value) {
        this.qid = value;
      }
    }
  },
  methods: {
    changeQuery() {
      // router.push:
      // 1. path / name
      // 2. query
      // 3. param
      this.$router.push({ query: { id: this.qid } }).catch(err => {
        console.log("error:", err);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter:", to.query.id);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate:", to.query.id);
    next();
  },
  watch: {
    // $route(to) {
    //   console.log("watch:", to.query.id);
    // }
    $route: {
      immediate: true,
      handler(to) {
        console.log("watch:", to.query.id);
      }
    }
  }
};
</script>

<style></style>
