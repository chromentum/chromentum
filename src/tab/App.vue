<template>
  <div class="h-screen flex flex-col">
    <BackgroundImageComponent :imgUrl="imgUrl" />
    <SearchBoxComponent />
    <DateTimeComponent />
    <span v-if="user" class="fixed bottom-2 ml-5 text-sm text-gray-400">
      <a :href="user.links.html" target="__blank"
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
    axios
      .get("http://chromentum-laravel.test/api/background-image?key=demoonetwo")
      .then((response) => {
        this.imgUrl = response.data.data.urls.full;
        this.user = response.data.data.user;
      });
  },
};
</script>
