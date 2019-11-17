<template>
  <div>
    <slot name="user" :username="username" :gender="gender" :age="age"></slot>
  </div>
</template>

<script>
export default {
  name: "user",
  props: ["username", "gender", "age"]
};
</script>

<style>
</style>