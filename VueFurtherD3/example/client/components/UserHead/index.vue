<template>
  <a
    href="javascript:;"
    class="button button--user"
    :style="{ backgroundImage: `url('${user.picture}')` }"
  >
    {{ user.name }}
  </a>
</template>

<script>
export default {
  name: 'UserHead',
  props: {
    user: {
      type: Object,
      required: true,
      validator: (value) => {
        const map = ['id', 'name', 'picture']
        for (const key of map) {
          if (value[key] === undefined) {
            return false
          }
        }
        return true
      }
    }
  }
}
</script>

<style></style>
