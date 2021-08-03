import Vue from "vue";
import App from "./App";
import store from "../store/";
import "../assets/tailwind.css";
import axios from "axios";
Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${store.state.auth.response.access_token}`;
new Vue({
  el: "#app",
  store,
  axios,
  render: (h) => h(App),
});
