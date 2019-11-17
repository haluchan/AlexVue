<template>
  <div id="app">
    <h1 v-if="loading">Loading...</h1>
    <Slider v-else-if="list && list.length" :list="list" :auto="true"></Slider>
  </div>
</template>

<script>
import axios from "axios";
import Slider from "@/components/Slider";
export default {
  name: "app",
  data() {
    return {
      loading: false,
      list: []
    };
  },
  components: {
    Slider
  },
  async mounted() {
    //await
    this.loading = true;
    this.list = await axios
      .get("slider.json")
      .then(res => res.data)
      .then(data => data.list || []);
    this.loading = false;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
