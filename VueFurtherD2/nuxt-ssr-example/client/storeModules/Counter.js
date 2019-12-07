export const state = () => ({
  count: 0,
  isLoading: false
});

export const mutations = {
  SET_COUNT(state, value) {
    state.count = value;
  },
  SET_LOADING(state, value) {
    state.isLoading = value;
  }
};

export const actions = {
  GET_COUNT({ state, commit }) {
    if (state.isLoading) return false;
    return new Promise(resolve => {
      commit("SET_LOADING", true);
      setTimeout(() => {
        let count = (Math.random() * 10) >> 0;
        commit("SET_COUNT", count);
        commit("SET_LOADING", false);
        resolve(count);
      }, 1500);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
