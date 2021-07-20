<template>
  <div class="z-10">
    <form :action="'https://' + engine" method="get" class="pl-3 pt-3">
      <div class="w-1/3">
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 flex items-center">
            <select
              class="
                focus:ring-0 focus:border-transparent
                h-full
                py-0
                pl-2
                pr-8
                border-transparent
                sm:text-sm
                rounded-md
              "
              v-model="engine"
            >
              <option value="google.com/search">Google</option>
              <option value="duckduckgo.com/">Duckduck Go</option>
              <option value="bing.com/search">Bing</option>
            </select>
          </div>
          <input
            type="text"
            name="q"
            id="q"
            class="
              ring-2 ring-gray-500
              focus:ring-2 focus:ring-gray-900 focus:border-transparent
              block
              w-full
              pl-32
              py-3
              sm:text-sm
              border-transparent
              rounded-md
            "
            placeholder="Search Here"
            autofocus="true"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      engine: "google.com/search",
    };
  },
};
</script>
