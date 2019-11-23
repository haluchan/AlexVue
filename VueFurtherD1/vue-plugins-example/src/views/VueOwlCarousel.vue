<template>
  <OwlCarousel :items="1" :loop="true" :autoplay="3000" :nav="false">
    <img v-for="item in list" :key="item.id" :src="item.src" />
  </OwlCarousel>
</template>

<script>
import OwlCarousel from "vue-owl-carousel2";
export default {
  name: "VueOwlCarousel",
  data() {
    return {
      list: [
        { id: 1, src: "./cats/1.jpg" },
        { id: 2, src: "./cats/2.jpg" },
        { id: 3, src: "./cats/3.jpg" },
        { id: 4, src: "./cats/4.jpg" },
        { id: 5, src: "./cats/5.jpg" }
      ]
    };
  },
  components: { OwlCarousel }
};
</script>

<style></style>
