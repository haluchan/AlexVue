<template>
  <div
    class="input"
  >
    <UserHead :user="user" />
    <input
      v-model.trim="text"
      v-focus
      type="text"
      :placeholder="user.name + '，在想些什麼？'"
      @keydown.enter="submitHandler"
    >
    <a
      href="javascript:;"
      class="button button--grey"
      @click="submitHandler"
    >
      送出
    </a>
  </div>
</template>

<script>
import UserHead from '~/components/UserHead'
export default {
  name: 'PostInput',
  components: {
    UserHead
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    submitHandler () {
      if (this.text) {
        this.$emit('add', this.text)
        this.text = ''
      }
    }
  }
}
</script>

<style>

.input {
  margin: 20px 0;
  display: flex;
  border: 1px solid #35495e;
}
.input input {
  color: #35495e;
  flex: 1;
  margin: 10px;
  padding: 10px;
  height: 50px;
  border: none;
  font-size: 20px;
  line-height: 50px;
}
.input input:focus {
  outline: 0;
}
</style>
