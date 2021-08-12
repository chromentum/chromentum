<template>
  <div class="text-white">
    <div class="text-xl">
      {{ quote.quote }}
    </div>
    <div class="text-right">~ {{ quote.author }}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      quote: "quote/quote",
      error: "quote/error",
      status: "quote/status",
    }),
  },
  mounted() {
    this.$store.dispatch("quote/fetchQuote");
    console.log(this.quote);
  },
};
</script>
