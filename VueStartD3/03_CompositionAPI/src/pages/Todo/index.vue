<template>
  <div>
    <!-- <Todo></Todo> -->
    <TodoComposition></TodoComposition>
  </div>
</template>

<script>
// import Todo from "./Todo";
import TodoComposition from "./TodoComposition";
export default {
  name: "todo",
  components: {
    // Todo,
    TodoComposition
  }
};
</script>

<style>
.todos {
  width: 600px;
  margin: 0 auto;
  table-layout: fixed;
  word-break: break-all;
}
td:nth-child(1),
td:nth-child(3) {
  width: 100px;
  text-align: center;
}
td:nth-child(2) {
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
}
.done td:nth-child(2) {
  text-decoration: line-through;
}
</style>