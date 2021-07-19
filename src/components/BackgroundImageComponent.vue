<template>
  <div class="h-screen absolute top-0" style="z-index: -100">
    <img v-if="imgUrl" :src="imgUrl" alt="" class="h-full w-full" />
  </div>
</template>
<script>
export default {
  props: ["imgUrl"],
};
</script>
