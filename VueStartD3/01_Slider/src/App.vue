<template>
  <div id="app">
    <h1 v-if="loading">讀取中</h1>
    <Slider :list="list" :auto="true" v-else-if="list && list.length"></Slider>
  </div>
</template>

<script>
import axios from "axios";
import Slider from "@/components/Slider";
// @是絕對路徑 vue 預設在src下

export default {
  name: "app",
  data() {
    return {
      loading: true,
      list: []
    };
  },
  components: {
    Slider
  },
  // async 不會改成非同步，vue還是用同步概念，只是會了裡面可以用await
  async mounted() {
    this.list = await axios
      .get("slider.json")
      .then(res => res.data)
      .then(data => data.list || []);
    this.loading = false;
  }
};
</script>

<style>
html {
  color: #34495e;
  background-color: #41b883;
  font-family: "微軟正黑體";
  text-align: center;
}
</style>
