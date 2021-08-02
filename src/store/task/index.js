import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default {
  state: {
    tasks: [],
    error: "",
    status: "",
  },
  getters: {
    tasks: (state) => state.tasks,
    error: (state) => state.error,
    status: (state) => state.status,
  },
  mutations: {
    set_tasks(state, tasks) {
      state.tasks = tasks;
      state.status = "success";
    },
    set_error(state, error) {
      state.error = error;
      state.status = "failure";
    },
    add_task(state, task) {
      state.tasks.push(task);
      state.status = "success";
    },
    remove_task(state, taskId) {
      state.tasks.splice(
        state.tasks.findIndex((task) => task.id == taskId),
        1
      );
      state.status = "success";
    },
    updateTask(state, task) {
      let index = state.tasks.findIndex((taskOld) => taskOld.id == task.id);
      if (typeof task.completed != "undefined")
        state.tasks[index].completed = task.completed;
      if (typeof task.description != "undefined")
        state.tasks[index].completed = task.description;
      state.status = "success";
    },
  },
  actions: {
    fetchTasks({ commit, state }) {
      state.status = "loading";
      axios
        .get("/tasks")
        .then((res) => {
          commit("set_tasks", res.data.data);
        })
        .catch((err) => {
          commit("set_error", err.response.data);
        });
    },
    createTask({ commit, state }, task) {
      state.status = "loading";
      axios
        .post("/tasks", task)
        .then((res) => {
          commit("add_task", res.data.data);
        })
        .catch((err) => {
          commit("set_error", err.response.data);
        });
    },
    removeTask({ commit, state }, taskId) {
      state.status = "deleting";
      axios
        .delete(`/tasks/${taskId}`)
        .then(() => {
          commit("remove_task", taskId);
        })
        .catch((err) => {
          commit("set_error", err.response);
        });
    },
    updateTask({ commit, state }, task) {
      state.status = "updating";
      axios
        .put(`/tasks/${task.id}`, task)
        .then(() => {
          commit("updateTask", task);
        })
        .catch((err) => {
          commit("set_error", err.response);
        });
    },
  },
  modules: {},
  namespaced: true,
};
