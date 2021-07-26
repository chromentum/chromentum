<template>
  <div>
    <div class="flex flex-col justify-end items-end" v-if="isLoggedIn">
      <img
        class="inline-block h-12 w-12 rounded-full shadow-md cursor-pointer"
        :src="authUser.profile_photo_url"
        alt=""
        v-on:click="toggleMenu"
      />
      <ul class="bg-white mt-2 rounded overflow-hidden shadow-md" v-if="open">
        <li class="text-base text-gray-700 py-4 px-4 hover:bg-gray-50">
          <div class="text-lg leading-4">{{ authUser.name }}</div>
          <div class="text-sm text-gray-400">{{ authUser.email }}</div>
        </li>
        <li
          class="
            text-sm text-gray-700
            py-1
            px-4
            cursor-pointer
            hover:bg-gray-50
          "
          v-on:click="logout"
        >
          Logout
        </li>
      </ul>
    </div>
    <div
      class="
        flex flex-col
        justify-center
        items-end
        bg-white
        rounded
        px-6
        py-2
        shadow-md
        text-lg
        hover:shadow-lg hover:bg-gray-50
        cursor-pointer
      "
      @click="login"
      v-else
    >
      Login
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapGetters({ isLoggedIn: "auth/isLoggedIn", authUser: "auth/authUser" }),
  },
  mounted() {
    if (this.authUser === null && this.isLoggedIn) {
      this.$store.dispatch("auth/fetchUser");
    }
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
    onClose() {
      this.open = false;
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
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
