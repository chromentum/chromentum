import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default {
  state: {
    response: "",
    status: "",
    user: {},
  },
  getters: {
    isLoggedIn: (state) => !!state.response.access_token,
    authStatus: (state) => state.status,
    authUser: (state) => state.user,
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, response) {
      state.status = "success";
      state.response = response;
    },
    auth_failure(state, error) {
      state.status = "error";
      state.response = error;
    },
    auth_logout(state) {
      state.status = "";
      state.response = "";
      state.user = {};
    },
  },
  actions: {
    login({ commit, state }, auth_url) {
      chrome.identity.launchWebAuthFlow(
        { url: auth_url, interactive: true },
        function (responseUrl) {
          var url = new URL(responseUrl);

          var tokenUrl =
            "http://chromentum-laravel.test/callback" +
            url.search +
            "&code_verifier=" +
            localStorage.getItem("codeVerifier");

          axios
            .get(tokenUrl)
            .then((response) => {
              commit("auth_success", response.data);
              console.log(state);
            })
            .catch((error) => {
              commit("auth_failure", error);
            });
        }
      );
    },
    fetchUser({ commit, state }) {
      axios
        .get("http://chromentum-laravel.test/api/user", {
          headers: {
            Authorization: `Bearer ${state.response.access_token}`,
          },
        })
        .then((response) => {
          commit("set_user", response.data.data);
        })
        .catch((error) => {
          commit("auth_failure", error);
        });
    },
  },
  modules: {},
  namespaced: true,
};
