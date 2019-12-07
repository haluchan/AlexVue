<template>
  <div>
    <h1>User: {{ $route.params.uid }}</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "User " + this.$route.params.uid
    };
  }
};
</script>

<style></style>
