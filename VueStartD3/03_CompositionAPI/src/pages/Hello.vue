<template>
  <div class="hello">
    <h1>Hello Composition API</h1>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "HelloWorld",
  beforeCreate() {
    console.log("Before Create");
  },
  setup() {
    console.log("Setup");
  },
  created() {
    console.log("Created");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
