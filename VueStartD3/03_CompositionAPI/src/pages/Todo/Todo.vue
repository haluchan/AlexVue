<template>
  <div>
    <form @submit.prevent="addTodo">
      <input type="text" v-model.trim="state.text" />
    </form>
    <div v-if="state.todos.length">
      <label>
        <input type="radio" :value="null" v-model="state.filter" />
        全部
      </label>
      <label>
        <input type="radio" :value="true" v-model="state.filter" />
        已完成
      </label>
      <label>
        <input type="radio" :value="false" v-model="state.filter" />
        未完成
      </label>
    </div>
    <table class="todos">
      <tr v-for="item in filtedTodos" :key="item.tid" :class="{done:item.done}">
        <td>
          <input type="checkbox" v-model="item.done" />
        </td>
        <td>{{ item.text }}</td>
        <td>
          <button @click="deleteTodo(item.tid)">刪除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: {
        text: "",
        filter: null,
        todos: []
      }
    };
  },
  computed: {
    filtedTodos() {
      return this.state.filter === null
        ? this.state.todos
        : this.state.todos.filter(item => item.done === this.state.filter);
    }
  },
  methods: {
    addTodo() {
      if (!this.state.text) return;
      this.state.todos.push({
        tid: new Date().getTime(),
        text: this.state.text,
        done: false
      });
      this.state.text = "";
    },
    deleteTodo(tid) {
      let index = this.state.todos.findIndex(item => item.tid === tid);
      this.state.todos.splice(index, 1);
    }
  }
};
</script>