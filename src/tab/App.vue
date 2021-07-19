<template>
  <div class="h-screen flex flex-col">
    <img
      src="https://images.unsplash.com/photo-1542300058-849d3b08aa0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
      alt=""
      class="h-screen w-full absolute top-0"
      style="z-index: -100"
    />
    <SearchBoxComponent />
    <DateTimeComponent />
  </div>
</template>

<script>
import DateTimeComponent from "../components/DateTimeComponent.vue";
import SearchBoxComponent from "../components/SearchBoxComponent.vue";
export default {
  components: { DateTimeComponent, SearchBoxComponent },
  data() {
    return {
      message: "My new tab page",
    };
  },
};
</script>
