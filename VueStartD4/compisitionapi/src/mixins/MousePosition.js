export default function() {
  return {
    data() {
      return {
        x: 0,
        y: 0
      };
    },
    methods: {
      mousemoveHandler(e) {
        this.x = e.pageX;
        this.y = e.pageY;
      }
    },
    mounted() {
      window.addEventListener("mousemove", this.mousemoveHandler);
    },
    beforeDestroy() {
      window.removeEventListener("mousemove", this.mousemoveHandler);
    }
  };
}
