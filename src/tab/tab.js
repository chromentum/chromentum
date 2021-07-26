import Vue from "vue";
import App from "./App";
import store from "../store/";
import "../assets/tailwind.css";

new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});
