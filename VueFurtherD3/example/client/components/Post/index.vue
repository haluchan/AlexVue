<template>
  <div class="post">
    <div class="user">
      <UserHead :user="post.user" />
    </div>
    <div class="detail">
      <input
        v-if="updating"
        placeholder="更新中..."
        type="text"
        disabled
      >
      <input
        v-else-if="editable && editing"
        v-model.trim="editingContent"
        v-focus
        type="text"
        @compositionstart="typing = true"
        @compositionend="typing = false"
        @keydown.enter="submitHandler"
        @keyup.esc="cancelHandler"
        @blur="cancelHandler"
      >
      <div
        v-else
        class="content"
      >
        {{ post.content }}
      </div>
      <div
        v-if="!editing && !updating"
        class="other"
      >
        <div
          v-if="editable"
          class="edit"
        >
          <a
            href="javascript:;"
            @click="editHandler"
          >修改</a>
          <a
            href="javascript:;"
            @click="deleteHandler"
          >
            刪除
          </a>
        </div>
        {{ getDatetime(post.time) }}
      </div>
    </div>
  </div>
</template>

<script>
import UserHead from '~/components/UserHead'
export default {
  name: 'Post',
  components: {
    UserHead
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    post: {
      type: Object,
      required: true,
      validator: (value) => {
        const map = ['id', 'content', 'time', 'user']
        const userMap = ['id', 'name', 'picture']
        for (const key of map) {
          if (value[key] === undefined) {
            return false
          }
        }
        for (const key of userMap) {
          if (value.user[key] === undefined) {
            return false
          }
        }
        return true
      }
    }
  },
  data () {
    return {
      typing: false,
      updating: false,
      editing: false,
      editingContent: ''
    }
  },
  methods: {
    getDatetime (time) {
      const date = new Date(time)

      const m = date.getMonth() + 1
      const d = date.getDate()
      const hour = date.getHours()
      const min = date.getMinutes()

      return `${date.getFullYear()}-${m < 10 ? 0 : ''}${m}-${d < 10 ? 0 : ''}${d} ${hour < 10 ? 0 : ''}${hour}:${min < 10 ? 0 : ''}${min}`
    },
    deleteHandler () {
      if (confirm('是否確認刪除？')) {
        this.$store.dispatch('DELETE_POST', this.post.id)
      }
    },
    editHandler () {
      this.editing = true
      this.editingContent = this.post.content
    },
    async submitHandler () {
      if (this.typing) return
      const text = this.editingContent
      if (text !== this.post.content) {
        this.updating = true
        await this.$store.dispatch('UPDATE_POST', { id: this.post.id, text })
        this.updating = false
      }
      this.cancelHandler()
    },
    cancelHandler () {
      this.editing = false
      this.editingContent = ''
    }
  }
}
</script>

<style>
.post {
  margin: 20px 0;
  display: flex;
}
.post .detail {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #35495e;
  flex: 1;
  margin: 10px;
  padding: 10px 20px;
  line-height: 30px;
}
.post .other {
  width: 100%;
  text-align: right;
  margin-top: 10px;
}
.post .edit {
  float: left;
}
.post .edit a {
  display: inline-block;
  color: #35495e;
  border: 1px solid;
  font-size: 12px;
  line-height: 20px;
  text-decoration: none;
  padding: 0 5px;
}
.post .edit a:hover {
  background-color: #35495e;
  color: #ffffff;
}

.detail .content {
  width: 100%;
}

.detail input {
  color: #35495e;
  flex: 1;
  margin: 10px;
  padding: 10px;
  height: 50px;
  border: none;
  font-size: 20px;
  line-height: 50px;
}
.detail input:focus {
  outline: 0;
}
</style>
