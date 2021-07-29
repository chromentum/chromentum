import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default {
  state: {
    tasks: [],
  },
  getters: {
    tasks: (state) => state.tasks,
  },
  mutations: {
    set_todos(state, tasks) {
      state.todos = tasks;
    },
  },
  actions: {
    fetchTasks() {
      console.log(axios.defaults);
      axios.get("/tasks").then((res) => {
        console.log(res);
      });
    },
  },
  modules: {},
  namespaced: true,
};
