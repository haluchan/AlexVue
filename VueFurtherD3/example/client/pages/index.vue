<template>
  <div id="post">
    <div class="container">
      <PostInput
        v-if="$auth.loggedIn"
        :user="user"
        @add="addHandler"
      />
      <div class="posts">
        <Post
          v-for="item in posts"
          :key="item.id"
          :post="item"
          :editable="user ? item.user.id === user.id : false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostInput from '~/components/PostInput'
import Post from '~/components/Post'

export default {
  components: {
    PostInput,
    Post
  },
  async fetch ({ store }) {
    await store.dispatch('GET_POST')
  },
  computed: {
    user () {
      return this.$store.state.auth && this.$store.state.auth.user
        ? this.$store.state.auth.user
        : null
    },
    posts () {
      return this.$store.getters.sortedPosts
    }
  },
  methods: {
    addHandler (text) {
      this.$store.dispatch('ADD_POST', { text })
    }
  }
}
</script>

<style>
</style>
