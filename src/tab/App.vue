<template>
  <div class="h-screen flex flex-col">
    <BackgroundImageComponent :imgUrl="imgUrl" />
    <SearchBoxComponent />
    <button @click="login">Login</button>
    <DateTimeComponent />
    <span v-if="user" class="fixed bottom-2 ml-5 text-sm text-gray-400">
      <a v-if="user.links" :href="user.links.html" target="__blank"
        >Photo by {{ user.name }}</a
      ></span
    >
  </div>
</template>

<script>
import axios from "axios";

import BackgroundImageComponent from "../components/BackgroundImageComponent.vue";
import DateTimeComponent from "../components/DateTimeComponent.vue";
import SearchBoxComponent from "../components/SearchBoxComponent.vue";
export default {
  components: {
    DateTimeComponent,
    SearchBoxComponent,
    BackgroundImageComponent,
  },
  data() {
    return {
      imgUrl: "",
      user: {},
    };
  },
  mounted() {
    console.log(this.$store.getters);
    axios
      .get("http://chromentum-laravel.test/api/background-image")
      .then((response) => {
        this.imgUrl = response.data.data.urls.regular;
        this.user = response.data.data.user;
      });
  },
  methods: {
    dec2hex(dec) {
      return dec.toString(16).padStart(2, "0");
    },
    generateId(len) {
      var arr = new Uint8Array((len || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, this.dec2hex).join("");
    },
    login() {
      var auth_url = "http://chromentum-laravel.test/redirect?";

      if (localStorage.getItem("state") === null) {
        localStorage.setItem("state", this.generateId(40));
      }

      if (localStorage.getItem("codeVerifier") === null) {
        localStorage.setItem("codeVerifier", this.generateId(128));
      }

      let auth_params = {
        code_verifier: localStorage.getItem("codeVerifier"),
        state: localStorage.getItem("state"),
      };

      const url = new URLSearchParams(Object.entries(auth_params));
      url.toString();
      auth_url += url;

      console.log(auth_url);
      this.$store.dispatch("auth/login", auth_url);
    },
  },
};
</script>
