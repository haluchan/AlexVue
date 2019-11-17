<template>
  <div>{{ this.userName }}</div>
</template>

<script>
export default {
  name: "user",
  computed: {
    userName() {
      return this.$store.state.user ? this.$store.state.user.name : "";
    }
  }
};
</script>

<style></style>
