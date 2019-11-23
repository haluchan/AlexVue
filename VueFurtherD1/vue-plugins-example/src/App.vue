<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/i18n">i18n</router-link> |
      <router-link to="/vee-validate">vee-validate</router-link> |
      <router-link to="/vue-simple-uploader">vue-simple-uploader</router-link> |
      <router-link to="/vue-owl-carousel">vue-owl-carousel</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 80px;
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  padding: 30px;
  z-index: 99;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
