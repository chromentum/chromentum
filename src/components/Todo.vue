<template>
  <div>
    <!-- Full Screen Overlay -->
    <div v-show="show" class="fixed inset-0 z-40" @click="show = false"></div>
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
        z-50
      "
    >
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
            @click="fetchTasks"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-400 cursor-pointer"
            :class="{ 'animate-spin': status == 'loading' }"
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
        <div class="flex-grow overflow-y-auto overflow-x-hidden">
          <div class="text-sm text-gray-500" v-if="tasks.length == 0">
            Add your tasks...
          </div>
          <div
            class="
              mx-5
              rounded-lg
              bg-white
              overflow-hidden
              flex flex-col
              shadow-md
              my-2
              relative
            "
            v-for="(todo, index) in tasks"
            :key="index"
          >
            <div class="flex overflow-hidden">
              <div
                class="
                  flex flex-col
                  items-center
                  cursor-pointer
                  w-5
                  px-0.5
                  shadow-lg
                  relative
                  bg-blue-400
                  overflow-ellipsis
                  group
                "
              >
                <svg
                  v-if="!todo.completed"
                  name="check"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 flex-1 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="markAsCompleted(todo.id)"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-if="todo.completed"
                  name="uncheck"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 flex-1 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="markAsNotCompleted(todo.id)"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="h-px w-full bg-white"></div>
                <svg
                  name="remove"
                  @click="openRemoveSection(todo.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 flex-1 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="flex-grow px-2 py-2 truncate">
                <h1
                  class="text-base truncate text-gray-500 text-left font-normal"
                  :class="{ 'line-through': todo.completed }"
                >
                  {{ todo.description }}
                </h1>
                <div
                  class="text-gray-500 w-full text-xxs text-left"
                  :class="{ 'line-through': todo.completed }"
                >
                  {{ todo.date_for_human }}
                </div>
                <div
                  :id="`remove-sec-${todo.id}`"
                  class="
                    absolute
                    flex
                    inset-0
                    opacity-0
                    -z-10
                    h-full
                    w-full
                    bg-white
                    trasition-all
                    delay-150
                    duration-300
                    items-center
                  "
                >
                  <button
                    class="
                      flex-1
                      bg-opacity-30
                      text-gray-500
                      h-full
                      hover:bg-red-500 hover:text-white
                    "
                    @click="closeRemoveSection(todo.id)"
                    :disabled="status == 'deleting'"
                  >
                    Cancel
                  </button>
                  <div class="w-px bg-gray-300 h-6"></div>
                  <button
                    @click="removeTask(todo.id)"
                    class="
                      flex-1
                      text-gray-500
                      hover:bg-green-500
                      h-full
                      hover:text-white
                    "
                    :disabled="status == 'deleting'"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        v-on:submit.prevent="createTask"
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
          v-model="taskDescription"
          class="flex-grow border focus:outline-none px-2 w-full h-12"
          placeholder="Create a Todo"
          @click="show = true"
        />
        <button
          class="h-full hover:bg-gray-100 cursor-pointer flex items-center px-2"
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
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      todos: [],
      taskDescription: "",
    };
  },
  computed: {
    ...mapGetters({
      tasks: "task/tasks",
      error: "task/error",
      status: "task/status",
    }),
  },
  created() {
    const onEscape = (e) => {
      if (this.show && e.keyCode === 27) {
        this.closeTaskBoard();
      }
    };

    document.addEventListener("keydown", onEscape);
    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", onEscape);
    });
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
    createTask() {
      this.show = true;
      let task = {
        description: this.taskDescription,
      };
      this.$store.dispatch("task/createTask", task);
      this.taskDescription = "";
    },
    fetchTasks() {
      this.$store.dispatch("task/fetchTasks");
    },
    openRemoveSection(id) {
      let removeSection = document.getElementById("remove-sec-" + id);
      if (removeSection.classList.contains("-z-10")) {
        removeSection.classList.remove("-z-10");
      }
      if (removeSection.classList.contains("opacity-0")) {
        removeSection.classList.remove("opacity-0");
      }
    },
    closeRemoveSection(id) {
      let removeSection = document.getElementById("remove-sec-" + id);
      if (!removeSection.classList.contains("opacity-0")) {
        removeSection.classList.add("opacity-0");
      }
      if (!removeSection.classList.contains("-z-10")) {
        removeSection.classList.add("-z-10");
      }
    },
    removeTask(id) {
      this.closeRemoveSection(id);
      this.$store.dispatch("task/removeTask", id);
    },
    markAsCompleted(id) {
      let status = { id: id, completed: true };
      this.$store.dispatch("task/updateTask", status);
    },
    markAsNotCompleted(id) {
      let status = { id: id, completed: false };
      this.$store.dispatch("task/updateTask", status);
    },
    closeTaskBoard() {
      this.show = false;
    },
  },
};
</script>

<style></style>
