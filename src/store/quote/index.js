import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default {
  state: {
    quote: {},
    error: "",
    status: "",
  },
  getters: {
    quote: (state) => state.quote,
    error: (state) => state.error,
    status: (state) => state.status,
  },
  mutations: {
    set_quote(state, quote) {
      state.quote = quote;
      state.status = "success";
    },
    set_error(state, error) {
      state.error = error;
      state.status = "failure";
    },
  },
  actions: {
    fetchQuote({ commit, state }) {
      state.status = "loading";
      axios
        .get("/quote")
        .then((res) => {
          commit("set_quote", res.data);
        })
        .catch((err) => {
          commit("set_error", err.response.data);
        });
    },
  },
  modules: {},
  namespaced: true,
};
