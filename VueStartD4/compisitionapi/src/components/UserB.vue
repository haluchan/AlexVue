<template>
  <div>
    <h1>{{ username }},{{gender}}, {{age}}</h1>
  </div>
</template>

<script>
export default {
  name: "user-b",
  props: ["username", "gender", "age"]
};
</script>

<style>
</style>