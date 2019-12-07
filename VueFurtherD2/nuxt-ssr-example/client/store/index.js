export const state = () => ({
  message: "Hello World"
});

export const getters = {};
export const mutations = {
  SET_MESSAGE(state, value) {
    state.message = value;
  }
};
export const actions = {
  nuxtServerInit({ commit }) {
    commit("SET_MESSAGE", "SERVER INIT");
    commit("USER/SET_FIRST_NAME", "Alex");
    commit("USER/SET_LAST_NAME", "Chen");
  }
};

// export default {
//   strict: true,
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// };
