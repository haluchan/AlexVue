<template>
  <nav>
    <nuxt-link to="/" class="button--green">Home</nuxt-link>
    <!-- <router-link to="/about">About</router-link> -->
    <nuxt-link to="/about" class="button--green">About</nuxt-link>
    <nuxt-link to="/users" class="button--green">Users</nuxt-link>
    <router-link to="/users/1" class="button--green">User 1</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-exact-active,
.nuxt-link-exact-active {
  color: #fff;
  background-color: #3b8070;
}
</style>
