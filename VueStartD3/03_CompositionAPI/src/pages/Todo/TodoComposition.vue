<template src="./template.html"></template>

<script>
// import { ref } from "@vue/composition-api";
import { reactive, computed } from "@vue/composition-api";
export default {
  setup() {
    // let text = ref("");
    // let filter = ref(null);
    // let todos = ref([]);

    const state = reactive({
      text: "",
      filter: null,
      todos: []
    });
    const filtedTodos = computed(() => {
      return state.filter === null
        ? state.todos
        : state.todos.filter(item => item.done === state.filter);
    });
    const addTodo = () => {
      if (!state.text) return;
      state.todos.push({
        tid: new Date().getTime(),
        text: state.text,
        done: false
      });
      state.text = "";
    };
    const deleteTodo = tid => {
      let index = state.todos.findIndex(item => item.tid === tid);
      state.todos.splice(index, 1);
    };
    return {
      state,
      filtedTodos,
      addTodo,
      deleteTodo
    };
  }
};
</script>