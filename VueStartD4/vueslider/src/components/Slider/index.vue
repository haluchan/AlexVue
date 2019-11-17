<template>
  <div class="slider">
    <SliderList :current="current"></SliderList>
    <SliderNav
      @change="changeHandler"
      :total="total"
      :current.sync="index"
      auto
    ></SliderNav>
  </div>
</template>

<script>
import SliderNav from "@/components/Slider/SliderNav";
import SliderList from "@/components/Slider/SliderList";
export default {
  name: "slider",
  // props: ["list", "auto"]
  props: {
    list: {
      type: Array,
      required: true
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
  provide() {
    return {
      sliderList: this.list
      // sliderIndex: this.index,
      // sliderObj: this.sliderObj
    };
  },
  computed: {
    nowPic() {
      return this.total > 0 ? this.list[this.current] : null;
    },
    total() {
      return this.list.length;
    },
    sliderObj() {
      return {
        list: this.list,
        index: this.index,
        current: this.current
      };
    },
    index: {
      get() {
        return this.current;
      },
      set(value) {
        this.current = (value + this.total) % this.total;
      }
    }
  },
  methods: {
    changeHandler(index) {
      this.current = (index + this.total) % this.total;
    }
  },
  components: {
    SliderNav,
    SliderList
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
