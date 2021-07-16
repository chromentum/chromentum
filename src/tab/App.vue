<template>
  <div class="h-screen relative">
    <img
      src="https://images.unsplash.com/photo-1542300058-849d3b08aa0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
      alt=""
      class="h-screen w-full absolute top-0"
      style="z-index: -100"
    />
    <div class="z-10">
      <form
        action="https://www.google.com/search"
        method="get"
        class="pl-3 pt-3"
      >
        <input
          type="text"
          placeholder="Search Google Here"
          name="q"
          class="
            rounded
            w-1/3
            bg-transparent
            focus:outline-none focus:ring-transparent focus:border-gray-900
          "
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "My new tab page",
    };
  },
};
</script>
