<template>
  <div id="app">
    <section>
      <div class="container">
        <h1>{{ msg }}</h1>
        <p>{{ count }}</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="get">get</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGatters, mapActions, mapMutations } from 'vuex'

// 各種map 寫法比較
export default {
  name: 'vuexmap',
  computed: {
    ...mapState({
      count: state => state['name-space'].count
    }),
    ...mapGatters(['msg'])
    // count: {
    //   get () {
    //     return this.$store.count
    //   }
    // },
    // msg: {
    //   get () {
    //     return this.$store.msg
    //   }
    // }
    //
    // set get 炫技寫法
    // count : {
    //   ...mapState({
    //     get: state => state.count
    //   }),
    //  ...mapMutations({
    //    set: 'CHANGE'
    //  })
    // }
    // 原本寫法
    // count: {
    //   get () {
    //     return this.$store.count
    //   },
    //   set (value) {
    //     this.$store.commit('CHANGE', value)
    //   }
    // }
  },
  methods: {
    ...mapMutations({
      change: 'CHANGE'
    }),
    increment () {
      this.change({ value: this.count + 1 })
    },
    decrement () {
      this.change({ value: this.count - 1 })
    },
    // increment () {
    //   this.$store.commit('CHANGE', { value: this.count + 1 })
    // },
    // decrement () {
    //   this.$store.commit('CHANGE', { value: this.count - 1 })
    // }

    // 在 vuex裡的action 是專門用來處理非同步
    // 所以最好用action裡用async fun return，下面就可以 await 來處理同步順序問題，也不用判斷還沒回傳回來時候的值
    ...mapActions({
      random: 'GET_RANDOM'
    }),
    get () {
      // await this.random()
      this.random()
    }
    // get () {
    //   await this.$store.dispatch('GET_RANDOM')
    // }
  }
}
</script>

<style scoped>

</style>
