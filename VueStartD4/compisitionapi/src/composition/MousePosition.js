import { ref, onMounted, onUnmounted } from "@vue/composition-api";

export default (fix) => {
  // console.log(Composition);
  // const ref = Composition.ref;
  // const mounted = Composition.onMounted;
  // const unmounted = Composition.onUnmounted;

  const x = ref(0); //x.value
  const y = ref(0); //x.value

  const mousemoveHandler = e => {
    x.value = e.pageX + fix;
    y.value = e.pageY + fix;
  };
  onMounted(() => {
    window.addEventListener("mousemove", mousemoveHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", mousemoveHandler);
  });

  return { x, y };
};
