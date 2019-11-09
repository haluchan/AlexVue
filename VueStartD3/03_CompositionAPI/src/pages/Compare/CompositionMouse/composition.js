/* eslint-disable no-console*/
import { ref, onMounted, onUnmounted } from "@vue/composition-api";

export default () => {
  const x = ref(0);
  const y = ref(0);
  const moveHandler = e => {
    console.log("composition-move");
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    window.addEventListener("mousemove", moveHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", moveHandler);
  });
  return { x, y };
};
