<template>
  <div class="layout--default">
    <div id="header">
      <div class="container">
        <h1>Nuxt</h1>
        <nav>
          <template
            v-if="$auth.loggedIn"
          >
            <a
              href="javascript:;"
              class="button button--grey"
              @click="$auth.logout()"
            >
              登出
            </a>
          </template>
          <a
            v-else
            href="javascript:;"
            class="button button--grey"
            @click="$auth.loginWith('facebook')"
          >
            登入
          </a>
        </nav>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style>
.layout--default{
  padding-top: 70px;
}
#header{
  position:fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
}

#header h1{
  color: #35495e;
  float: left;
  line-height: 30px;
  padding: 10px;
  margin: 10px;
}
#header nav{
  float: right;
  display: flex
}
#header:after{
  display: block;
  content:"";
  clear: both;
}
</style>
