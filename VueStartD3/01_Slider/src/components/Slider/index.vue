<template>
  <div class="slider" @mouseenter="focus = true" @mouseleave="focus = false">
    <SliderList :current="current"></SliderList>
    <SliderNav v-if="list.length >1" :current.sync="chang" :auto="timerStatus"></SliderNav>
    <!-- :current.sync="current" 可以省略 資料監聽與資料處理，建議搭配computed使用，做資料檢查
      @update:current='change'
      methods:{
        change(target){
          this.cureent= target
        }
      }
    -->
  </div>
</template>

<script>
import SliderList from "./SliderList";
import SliderNav from "./SliderNav";
export default {
  name: "Slider",
  props: {
    list: {
      required: true,
      type: Array
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: 0,
      focus: false
    };
  },
  computed: {
    // 建議sync搭配computed set get使用
    // change:{
    //   set(){
    //     return this.current
    //   },
    //   set(index){
    //     this.current = index < 0 ? this.last : index > this.last ? 0 : index;
    //   }
    // },
    timerStatus() {
      return this.auto && !this.focus;
    }
  },
  // 不用透過父傳子概念，可以跨層傳遞(共用資料)
  // provide 提供 inject
  // 可以傳物件或陣列
  provide() {
    return {
      sliderList: this.list
    };
  },
  components: {
    SliderList,
    SliderNav
  }
};
</script>

<style>
.slider {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 35%;
  background-color: #34495e;
  overflow: hidden;
}
</style>