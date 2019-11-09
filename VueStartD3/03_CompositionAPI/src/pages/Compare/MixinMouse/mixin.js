/* eslint-disable no-console */
export default {
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  methods: {
    moveHandler(e) {
      console.log("mixin-move");
      this.x = e.pageX;
      this.y = e.pageY;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.moveHandler);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.moveHandler);
  }
};
