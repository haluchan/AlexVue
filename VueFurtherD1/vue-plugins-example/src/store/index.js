import Vue from "vue";
import Vuex from "vuex";
import App from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    SET_LANG(state, payload) {
      App.$i18n.locale = payload;
    }
  },
  actions: {
    async SET_LANG({ commit }, payload) {
      if (payload in App.$i18n.messages) {
        commit("SET_LANG", payload);
      } else {
        try {
          const module = await import(`@/plugins/i18n/locales/${payload}.json`);
          App.$i18n.setLocaleMessage(payload, module.default);
          commit("SET_LANG", payload);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
});
