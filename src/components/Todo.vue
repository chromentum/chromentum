<template>
  <div>
    <div
      class="
        fixed
        bottom-2
        transition-all
        flex flex-col
        text-center
        items-center
        justify-end
        right-6
        rounded
        h-4/5
        w-3/12
        p-2
        duration-500
      "
    >
      <!-- <div class="w-full bg-white rounded shadow-md">
        
      </div> -->
      <div
        class="
          flex-grow
          h-0
          transition-all
          w-full
          opacity-0
          duration-500
          rounded-md
          shadow-lg
          bg-gray-50
          flex flex-col
        "
        :class="{ 'opacity-100': show }"
      >
        <div class="flex items-center px-3">
          <h1
            @click="toggleMenu"
            class="flex-grow text-base text-gray-500 my-2 cursor-pointer"
          >
            Todo List
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="flex-grow overflow-y-auto">
          <div
            class="mx-5 rounded-lg bg-white flex flex-col shadow-md my-2"
            v-for="(todo, index) in todos"
            :key="index"
          >
            <div class="flex">
              <div
                class="flex items-center w-5 px-0.5 shadow-lg"
                :class="{
                  'bg-green-500': todo.completed,
                  'bg-red-300': !todo.completed,
                }"
              >
                <svg
                  v-if="todo.completed"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <svg
                  v-if="!todo.completed"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div class="flex-grow relative px-2">
                <h1 class="text-base text-gray-500 ml-4 text-left font-normal">
                  {{ todo.description }}
                </h1>
                <div class="text-gray-500 w-full text-right">
                  {{ todo.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          w-full
          bg-white
          justify-center
          rounded-md
          flex
          items-center
          shadow-md
          overflow-hidden
          h-12
          mt-2
        "
      >
        <input
          class="flex-grow border focus:outline-none px-2 w-full h-12"
          placeholder="Create a Todo"
          @focus="show = true"
        />
        <div
          class="h-full hover:bg-gray-50 cursor-pointer flex items-center px-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      todos: [],
    };
  },
  mounted() {
    for (let index = 0; index < 10; index++) {
      this.todos.push({
        description: "Test Todo",
        date: index + "-06-21",
        completed: index > 5 ? false : true,
      });
    }
  },
  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
  },
};
</script>

<style></style>
