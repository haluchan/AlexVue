import axios from '~/plugins/axios'
export const state = () => ({
  posts: []
})
export const getters = {
  sortedPosts (state) {
    return [...state.posts].sort((a, b) => {
      return b.time - a.time
    })
  }
}
export const mutations = {
  SET_POST (state, payload) {
    state.posts = payload
  },
  ADD_POST (state, payload) {
    state.posts = state.posts.concat(payload)
  },
  DELETE_POST (state, id) {
    const index = state.posts.findIndex(post => post.id === id)
    state.posts.splice(index, 1)
  },
  UPDATE_POST (state, payload) {
    const index = state.posts.findIndex(post => post.id === payload.id)
    state.posts.splice(index, 1, payload)
  }
}
export const actions = {
  async GET_POST ({ commit }) {
    const result = await axios.get('/api/posts').then(result => result.data)
    if (result.data) {
      commit('SET_POST', result.data.posts || [])
    }
  },
  async ADD_POST ({ commit }, payload) {
    const result = await axios.post('/api/posts', payload).then(result => result.data)
    if (result.data) {
      commit('ADD_POST', result.data.posts || [])
    }
  },
  async DELETE_POST ({ commit }, id) {
    const result = await axios.delete(`/api/posts/${id}`).then(result => result.data)
    if (result.data && result.data.posts.length) {
      commit('DELETE_POST', id)
    }
  },
  async UPDATE_POST ({ commit }, { id, text }) {
    const result = await axios.patch(`/api/posts/${id}`, { text }).then(result => result.data)
    if (result.data && result.data.posts.length) {
      commit('UPDATE_POST', result.data.posts[0])
    }
  }
}
