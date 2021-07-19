<template>
  <div class="flex-grow flex flex-col justify-center items-center">
    <div class="text-10xl text-white leading-none">{{ hour }}:{{ minutes }}</div>
    <div class="text-white text-2xl font-semibold">
      {{ day }} {{ date }} {{ month }} {{ year }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    var now = new moment();
    return {
      hour: now.format("HH"),
      minutes: now.format("mm"),
      seconds: now.format("ss"),
      day: now.format("dddd"),
      date: now.format("DD"),
      month: now.format("MMMM"),
      year: now.format("YYYY"),
    };
  },
  mounted() {
    setInterval(this.doDate, 1000);
  },
  methods: {
    doDate() {
      var now = new moment();
      this.hour = now.format("HH");
      this.minutes = now.format("mm");
      this.seconds = now.format("ss");
      this.day = now.format("dddd");
      this.date = now.format("DD");
      this.month = now.format("MMMM");
      this.year = now.format("YYYY");
    },
  },
};
</script>
