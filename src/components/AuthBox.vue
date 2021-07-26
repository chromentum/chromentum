<template>
  <div>
    <div class="flex flex-col justify-end items-end" v-if="isLoggedIn">
      <img
        class="inline-block h-12 w-12 rounded-full shadow-md cursor-pointer"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
        v-on:click="toggleMenu"
      />
      <ul class="bg-white mt-2 rounded overflow-hidden shadow-md" v-if="open">
        <li class="text-base text-gray-700 py-4 px-4 hover:bg-gray-50">
          <div class="text-lg leading-4">{{ authUser.name }}</div>
          <div class="text-sm text-gray-400">{{ authUser.email }}</div>
        </li>
        <li
          class="text-sm text-gray-700 py-1 px-4 cursor-pointer hover:bg-gray-50"
          v-on:click="logout"
        >
          Logout
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
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
    if (this.isLoggedIn && this.authUser === {}) {
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
      axios
        .get("http://chromentum-laravel.test/api/logout", {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.response.access_token}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
